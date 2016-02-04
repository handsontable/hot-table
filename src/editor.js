(function(w) {
  var BaseEditor = Handsontable.editors.BaseEditor;

  function Editor(hotInstance) {
    BaseEditor.call(this, hotInstance);
    this.model = null;
    this.template = null;
    this.eventManager = Handsontable.eventManager(this);
    this.createContainerElement();
    this.initEvents();
  }

  Editor.prototype = Object.create(BaseEditor.prototype, {
    constructor: {
      value: BaseEditor,
      configurable: true
    }
  });

  /**
   * Init editor instance
   */
  Editor.prototype.init = function() {
    BaseEditor.prototype.init.call(this);
  };

  /**
   * Create and prepare editor container elements
   */
  Editor.prototype.createContainerElement = function() {
    this.container = document.createElement('div');
    Handsontable.dom.addClass(this.container, 'handsontableInputHolder');

    this.containerStyle = this.container.style;
    this.containerStyle.display = 'none';
    this.containerStyle.top = 0;
    this.containerStyle.left = 0;

    this.instance.rootElement.appendChild(this.container);
  };

  /**
   * Create editor element from template
   */
  Editor.prototype.createEditorElement = function() {
    if (!this.model) {
      this.model = this.template.stamp();
      Polymer.dom(this.container).appendChild(this.model.root);
    }
  };

  /**
   * Fill all necessary cell variables
   *
   * @param {Number} row
   * @param {Number} col
   * @param {String} prop
   * @param {Element} td
   * @param {*} originalValue
   * @param {Object} cellProperties
   */
  Editor.prototype.prepare = function(row, col, prop, td, originalValue, cellProperties) {
    BaseEditor.prototype.prepare.call(this, row, col, prop, td, originalValue, cellProperties);
    this.createEditorElement();

    this.model.row = row;
    this.model.col = col;
    this.model.prop = prop;
    this.model.value = originalValue;
    this.model.cellProperties = cellProperties;
    this.model.editor = this;
  };

  /**
   * Add all necessary events
   */
  Editor.prototype.initEvents = function() {
    var _this = this;

    this.instance.addHook('afterScrollVertically', function() {
      _this.refreshDimensions();
    });

    this.instance.addHook('afterColumnResize', function() {
      _this.refreshDimensions();
      _this.focus();
    });

    this.instance.addHook('afterRowResize', function() {
      _this.refreshDimensions();
      _this.focus();
    });

    this.instance.addHook('afterDestroy', function() {
      _this.eventManager.destroy();
    });
  };

  /**
   * Get section name where cell is edited
   *
   * @returns {String}
   */
  Editor.prototype.getEditorSection = function() {
    var settings = this.instance.getSettings(),
      section;

    if (this.row < settings.fixedRowsTop) {
      if (this.col < settings.fixedColumnsLeft) {
        section = 'corner';

      } else {
        section = 'vertical';
      }
    } else {
      if (this.col < settings.fixedColumnsLeft) {
        section = 'horizontal';
      }
    }

    return section;
  };

  /**
   * Get edited cell element (TD)
   *
   * @returns {HTMLTableCellElement|undefined}
   */
  Editor.prototype.getEditedCell = function() {
    var editorSection = this.getEditorSection(), editedCell;

    if (['top', 'left', 'corner'].indexOf(editorSection) > 0) {
      editedCell = this.instance.view.wt.wtScrollbars[editorSection].clone.
          wtTable.getCell({row: this.row, col: this.col});

    } else {
      editedCell = this.instance.getCell(this.row, this.col);
    }

    return editedCell !== -1 && editedCell !== -2 ? editedCell : undefined;
  };

  /**
   * Get css transform array offset
   *
   * @returns {Array|undefined}
   */
  Editor.prototype.getSectionOffset = function() {
    var editorSection = this.getEditorSection(), offset;

    if (editorSection) {
      offset = Handsontable.dom.getCssTransform(this.instance.view.wt.wtScrollbars[editorSection].clone.
          wtTable.holder.parentNode);
    }

    return offset;
  };

  /**
   * Refresh editor container dimension related with edited cell position
   */
  Editor.prototype.refreshDimensions = function() {
    var width, height, rootOffset, tdOffset, cssTransformOffset;

    if (this.state !== Handsontable.EditorState.EDITING) {
      return;
    }
    this.TD = this.getEditedCell();

    if (!this.TD) {
      return;
    }
    width = Handsontable.dom.outerWidth(this.TD);
    height = Handsontable.dom.outerHeight(this.TD);
    rootOffset = Handsontable.dom.offset(this.instance.rootElement);
    tdOffset = Handsontable.dom.offset(this.TD);
    cssTransformOffset = this.getSectionOffset();

    if (cssTransformOffset && cssTransformOffset !== -1) {
      this.containerStyle[cssTransformOffset[0]] = cssTransformOffset[1];

    } else {
      Handsontable.dom.resetCssTransform(this.container);
    }
    this.containerStyle.minWidth = width + 'px';
    this.containerStyle.height = height + 'px';
    this.containerStyle.top = tdOffset.top - rootOffset.top + 'px';
    this.containerStyle.left = tdOffset.left - rootOffset.left + 'px';
    this.containerStyle.display = '';
  };

  /**
   * Fired on begin editing
   *
   * @param {*} initialValue
   * @param {Event} event
   */
  Editor.prototype.beginEditing = function(initialValue, event) {
    if (this.state !== Handsontable.EditorState.VIRGIN) {
      return;
    }
    this.instance.view.scrollViewport(new WalkontableCellCoords(this.row, this.col));
    this.instance.view.render();
    this.state = Handsontable.EditorState.EDITING;

    initialValue = typeof initialValue === 'string' ? initialValue : this.originalValue;
    this.setValue(initialValue);

    this.open(event);
    this._opened = true;
    this.focus();

    this.instance.view.render();
  };

  /**
   * Fired on finish editing
   *
   * @param {Boolean} restoreOriginalValue
   * @param {Boolean} ctrlDown
   * @param {Function} callback
   */
  Editor.prototype.finishEditing = function(restoreOriginalValue, ctrlDown, callback) {
    BaseEditor.prototype.finishEditing.call(this, restoreOriginalValue, ctrlDown, callback);
  };

  /**
   * Fired on open editor
   */
  Editor.prototype.open = function() {
    this.refreshDimensions();
    this.model.showed = true;
  };

  /**
   * Fired on close editor
   */
  Editor.prototype.close = function() {
    this.containerStyle.display = 'none';
    this.model.showed = false;
  };

  /**
   * Fired after editor is closed
   *
   * @returns {*}
   */
  Editor.prototype.getValue = function() {
    return this.model.value;
  };

  /**
   * Fired before editor is opened
   *
   * @param {*} value
   */
  Editor.prototype.setValue = function(value) {
    this.model.value = value;
  };

  /**
   * Fired before editor is opened and before set value is triggered
   */
  Editor.prototype.focus = function() {

  };

  w.HotTableUtils = w.HotTableUtils || {};
  w.HotTableUtils.Editor = Editor;
}(window));
