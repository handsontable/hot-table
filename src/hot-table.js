(function() {
  var
    settingsParser = new HotTableUtils.SettingsParser(),
    lastSelectedCellMeta;

  Polymer({
    is: 'hot-table',
    properties: settingsParser.getHotTableProperties(),

    behaviors: [
      HotTableUtils.behaviors.PublicMethodsBehavior
    ],

    /**
     * @property hot
     * @type Handsontable
     * @default null
     */
    hot: null,

    /**
     * On create element but not attached to DOM
     */
    created: function() {
      this.activeNestedTable = null;
      this.nestedTables = null;
      this.destroyed = false;
      this.initialized = false;
      this.hotRootElement = document.createElement('div');

      if (this.id) {
        this.hotRootElement.id = this.id;
      }

      this.hot = new Handsontable.Core(this.hotRootElement, {});
    },

    /**
     * On attached element to DOM
     */
    attached: function() {
      this.$.htContainer.parentNode.replaceChild(this.hotRootElement, this.$.htContainer);

      this.async(function() {
        if (!this.hot) {
          return;
        }
        // Fix detection of Polymer environment
        this.hot.isHotTableEnv = true;
        Handsontable.eventManager.isHotTableEnv = this.hot.isHotTableEnv;

        var settings = settingsParser.parse(this);

        if (settings.colHeaders !== false && Array.isArray(this.datarows) && this.datarows.length &&
            this.colHeaders !== null) {
          if (typeof this.datarows[0] === 'object' && !Array.isArray(this.datarows[0])) {
            this.colHeaders = Object.keys(this.datarows[0]);
          }
        }
        this.hot.updateSettings(settings);
        this.hot.init();
        this.initialized = true;

        this.collectNestedTables();
        this.registerHooks();
      }, 1);
    },

    /**
     * Try to destroy handsontable instance if hadn't been destroyed
     */
    detached: function() {
      if (this.hot && !this.destroyed) {
        this.hot.destroy();
        this.hot = null;
      }
    },

    /**
     * Register hooks
     */
    registerHooks: function() {
      var _this = this;

      if (!Handsontable.dom.isChildOfWebComponentTable(this.parentNode)) {
        Handsontable.hooks.add('beforeOnCellMouseDown', function() {
          _this.onBeforeOnCellMouseDown.apply(_this, [this].concat(Array.prototype.slice.call(arguments)));
        });
        Handsontable.hooks.add('afterOnCellMouseDown', function() {
          _this.onAfterOnCellMouseDown.apply(_this, [this].concat(Array.prototype.slice.call(arguments)));
        });
      }
      this.hot.addHook('afterModifyTransformStart', this.onAfterModifyTransformStart.bind(this));
      this.hot.addHook('beforeKeyDown', this.onBeforeKeyDown.bind(this));
      this.hot.addHook('afterDeselect', function() {
        _this.highlightedRow = -1;
        _this.highlightedColumn = -1;
      });
      this.hot.addHook('afterSelectionEnd', function() {
        var range = _this.hot.getSelectedRange();

        _this.highlightedRow = range.highlight.row;
        _this.highlightedColumn = range.highlight.col;
      });
      this.hot.addHook('afterDestroy', function() {
        _this.destroyed = true;
      });
    },

    /**
     * Detect and collect all founded nested hot-table's
     */
    collectNestedTables: function() {
      var parentTable = null,
        isNative = Handsontable.helper.isWebComponentSupportedNatively();

      if (!Handsontable.dom.isChildOfWebComponentTable(this.parentNode)) {
        parentTable = this;
      }
      this.nestedTables = new HotTableUtils.NestedTable(this);
      this.nestedTables.setStrategy(isNative ? 'native' : 'emulation', parentTable);
      this.nestedTables.update();
    },

    /**
     * @param {Handsontable} hotInstance
     * @param {Event} event
     * @param {Object} coords
     * @param {HTMLElement} TD
     */
    onBeforeOnCellMouseDown: function(hotInstance, event, coords, TD) {
      var cellMeta;

      if (!this.nestedTables.isNested(hotInstance) && hotInstance !== this.hot) {
        return;
      }
      cellMeta = hotInstance.getCellMeta(coords.row, coords.col);

      if (this.activeNestedTable) {
        cellMeta.disableVisualSelection = true;

      } else {
        cellMeta.disableVisualSelection = false;
        this.activeNestedTable = hotInstance;
      }
      // on last event set first table as listening
      if (hotInstance === this.hot) {
        this.activeNestedTable.listen();
        this.activeNestedTable = null;
      }
    },

    /**
     * @param {Handsontable} hotInstance
     * @param {Event} event
     * @param {Object} coords
     */
    onAfterOnCellMouseDown: function(hotInstance, event, coords) {
      var cellMeta;

      if (!this.nestedTables.isNested(hotInstance) && hotInstance !== this.hot) {
        return;
      }
      cellMeta = hotInstance.getCellMeta(coords.row, coords.col);
      cellMeta.disableVisualSelection = false;
    },

    /**
     * @param {WalkontableCellCoords} coords
     * @param {Number} rowTransform
     * @param {Number} colTransform
     */
    onAfterModifyTransformStart: function(coords, rowTransform, colTransform) {
      var parent = this.nestedTables.getParent(),
        cellMeta,
        newCoords,
        selected;

      cellMeta = this.getCellMeta(coords.row, coords.col);
      cellMeta.disableVisualSelection = false;
      lastSelectedCellMeta = cellMeta;

      if (parent && (rowTransform !== 0 || colTransform !== 0)) {
        selected = parent.getSelected();
        cellMeta.disableVisualSelection = true;
        newCoords = {
          row: selected[0] + rowTransform,
          col: selected[1] + colTransform
        };

        if (newCoords.row < 0 || newCoords.row >= parent.countRows()) {
          newCoords.row -= rowTransform;
        }
        if (newCoords.col < 0 || newCoords.col >= parent.countCols()) {
          newCoords.col -= colTransform;
        }
        cellMeta = parent.getCellMeta(newCoords.row, newCoords.col);
        cellMeta.disableVisualSelection = false;
        lastSelectedCellMeta = cellMeta;

        parent.selectCell(newCoords.row, newCoords.col, undefined, undefined, true, false);
        parent.listen();
      }
    },

    /**
     * @param {Event} event
     */
    onBeforeKeyDown: function(event) {
      var td, childTable, cellMeta;

      if (!this.isListening() || event.keyCode !== Handsontable.helper.KEY_CODES.ENTER) {
        return;
      }
      if (!lastSelectedCellMeta || lastSelectedCellMeta.editor !== false) {
        return;
      }
      td = this.getCell(lastSelectedCellMeta.row, lastSelectedCellMeta.col);

      if (td) {
        cellMeta = this.getCellMeta(lastSelectedCellMeta.row, lastSelectedCellMeta.col);
        cellMeta.disableVisualSelection = true;
        // Refresh cell border according to disableVisualSelection setting
        this.selectCell(lastSelectedCellMeta.row, lastSelectedCellMeta.col);

        childTable = td.querySelector(this.nodeName);
        cellMeta = childTable.getCellMeta(0, 0);
        cellMeta.disableVisualSelection = false;
        lastSelectedCellMeta = cellMeta;
        childTable.selectCell(0, 0, undefined, undefined, true, false);

        setTimeout(function() {
          childTable.listen();
        }, 0);
      }
    },

    onMutation: function() {
      var columns;

      if (this.hot && this.initialized) {
        columns = settingsParser.parseColumns(this);
        this.hot.updateSettings({columns: columns});
      }
    },

    attributeChanged: function() {
      this._onChanged();
    },

    _onChanged: function() {
      var settings;

      if (this.hot && this.initialized) {
        settings = settingsParser.parse(this);
        this.hot.updateSettings(settings);
      }
    }
  });
}());
