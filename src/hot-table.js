(function() {

  function parseDatacolumn(HANDSONTABLE, HOTCOLUMN) {
    var obj = {},
      attrName,
      i,
      ilen,
      val,
      innerHANDSONTABLE;

    for (i = 0, ilen = publicProperties.length; i < ilen; i++) {
      attrName = publicProperties[i];

      if (attrName === 'data') {
        attrName = 'value';
      }
      else if (attrName === 'title') {
        attrName = 'header';
      }

      if (HOTCOLUMN[attrName] === null) {
        continue; //default value
      }
      else if (HOTCOLUMN[attrName] !== void 0 && HOTCOLUMN[attrName] !== "") {
        val = HOTCOLUMN[attrName];
      }
      else {
        // Dec 3, 2013 - Polymer returns empty string for node properties such as HOTCOLUMN.width
        val = HOTCOLUMN.getAttribute(attrName);
      }

      if (val !== void 0 && val !== HANDSONTABLE[attrName]) {
        obj[publicProperties[i]] = readOption(HOTCOLUMN, attrName, val);
      }
    }
    innerHANDSONTABLE = HOTCOLUMN.getElementsByTagName('hot-table');

    if (innerHANDSONTABLE.length) {
      obj.handsontable = parseHandsontable(innerHANDSONTABLE[0]);
    }

    return obj;
  }

  function getModel(HANDSONTABLE) {
    if (HANDSONTABLE.templateInstance) {
      return HANDSONTABLE.templateInstance.model;
    }
    else {
      return window;
    }
  }

  function getModelPath(HANDSONTABLE, path) {
    var model, expression, obj;

    // happens in Polymer when assigning
    // as datarows="{{ model.subpage.people }}" or settings="{{ model.subpage.settings }}
    if (typeof path === 'object' || typeof path === 'function') {
      return path;
    }
    model = getModel(HANDSONTABLE);
    expression = 'with(model) { ' + path + ';}';
    /* jshint -W061 */
    obj = eval(expression);

    return (obj);
  }

  function parseDatacolumns(HANDSONTABLE) {
    var columns = [],
      i, ilen;

    for (i = 0, ilen = HANDSONTABLE.childNodes.length; i < ilen; i++) {
      if (HANDSONTABLE.childNodes[i].nodeName === 'HOT-COLUMN') {
        columns.push(parseDatacolumn(HANDSONTABLE, HANDSONTABLE.childNodes[i]));
      }
    }

    return columns;
  }

  function readOption(HANDSONTABLE, key, value) {
    if (key === 'datarows' || key === 'renderer' || key === 'source' || key === 'afterOnCellMouseOver' ||
        publicHooks.indexOf(key) > -1) {
      return getModelPath(HANDSONTABLE, value);
    }

    return readBool(value);
  }

  function filterNonNull(obj) {
    var result = {};

    for (var i in obj) {
      if (obj.hasOwnProperty(i) && obj[i] !== null) {
        result[i] = obj[i];
      }
    }

    return result;
  }

  function parseHandsontable(HANDSONTABLE) {
    var columns = parseDatacolumns(HANDSONTABLE),
      options = webComponentDefaults(),
      attrName, i, ilen;

    for (i = 0, ilen = publicProperties.length; i < ilen; i++) {
      attrName = publicProperties[i];

      if (attrName === 'data') {
        attrName = 'datarows';
      }
      options[publicProperties[i]] = readOption(HANDSONTABLE, attrName, HANDSONTABLE[attrName]);
    }

    if (HANDSONTABLE.settings) {
      var settingsAttr = getModelPath(HANDSONTABLE, HANDSONTABLE.settings);

      for (i in settingsAttr) {
        if (settingsAttr.hasOwnProperty(i)) {
          options[i] = settingsAttr[i];
        }
      }
    }

    if (columns.length) {
      options.columns = columns;
    }

    // Polymer reports null default values for all declared custom element properties.
    // We don't want them to override Handsontable defaults
    options = filterNonNull(options);

    return options;
  }

  var publicMethods = ['updateSettings', 'loadData', 'render', 'setDataAtCell', 'setDataAtRowProp', 'getDataAtCell',
    'getDataAtRowProp', 'countRows', 'countCols', 'rowOffset', 'colOffset', 'countVisibleRows', 'countVisibleCols',
    'clear', 'clearUndo', 'getData', 'alter', 'getCell', 'getCellMeta', 'selectCell', 'deselectCell', 'getSelected',
    'getSelectedRange', 'destroyEditor', 'getRowHeader', 'getColHeader', 'destroy', 'isUndoAvailable',
    'isRedoAvailable', 'undo', 'redo', 'countEmptyRows',
    'countEmptyCols', /*'isEmptyRow', 'isEmptyCol', -- those are also publicProperties*/ 'parseSettingsFromDOM',
    'addHook', 'addHookOnce', 'getValue', 'getInstance', 'getSettings'
  ];
  var publicHooks = Object.keys(Handsontable.PluginHooks.hooks);
  var publicProperties = Object.keys(Handsontable.DefaultSettings.prototype);

  publicProperties.push('groups', 'settings', 'source', 'title', 'checkedTemplate',
    'uncheckedTemplate', 'renderer', 'format');

  publicProperties = publicProperties.concat(publicHooks);

  function webComponentDefaults() {
    return {
      observeChanges: true
    };
  }

  var wcDefaults = webComponentDefaults();

  var publish = {};

  publicMethods.forEach(function (hotMethod) {
    publish[hotMethod] = function () {
      return this.instance[hotMethod].apply(this.instance, arguments);
    };
  });

  publicProperties.forEach(function (hotProp) {
    var wcProp;

    if (!publish[hotProp]) {
      wcProp = hotProp;

      if (hotProp === 'data') {
        wcProp = 'datarows';
      }
      else if (hotProp === 'title') {
        // rename 'title' attribute to 'header' because 'title' was causing
        // problems (https://groups.google.com/forum/#!topic/polymer-dev/RMMsV-D4HVw)
        wcProp = 'header';
      }

      var val = wcDefaults[hotProp] === void 0 ? Handsontable.DefaultSettings.prototype[hotProp] : wcDefaults[hotProp];

      if (val === void 0) {
        publish[wcProp] = null; //Polymer does not like undefined
      }
      else if (hotProp === 'observeChanges') {
        publish[wcProp] = true; //on by default
      }
      else {
        publish[wcProp] = val;
      }

      publish[wcProp + 'Changed'] = function () {
        if (!this.instance) {
          return; //attribute changed callback called before attached
        }

        if (wcProp === 'settings') {
          var settings = getModelPath(this, this[wcProp]);
          this.updateSettings(settings);
          return;
        }

        var update = {};
        update[hotProp] = readOption(this, wcProp, this[wcProp]);
        this.updateSettings(update);
      };
    }
  });

  function readBool(val) {
    if (val === void 0 || val === 'false') {
      return false;
    }
    else if (val === '' || val === 'true') {
      return true;
    }

    return val;
  }

  publish.highlightedRow = -1;
  publish.highlightedColumn = -1;

  Polymer('hot-table', {
    publish: publish,

    /**
     * @property instance
     * @type Handsontable
     * @default null
     */
    instance: null,

    attached: function () {
      var _this = this;

      this.instance = new Handsontable(this.$.htContainer, parseHandsontable(this));

      // TODO: move below to Handsontable
      this.addHook('afterDeselect', function () {
        _this.highlightedRow = -1;
        _this.highlightedColumn = -1;
      });
      this.addHook('afterSelectionEnd', function () {
        var range = _this.getSelectedRange();
        _this.highlightedRow = range.highlight.row;
        _this.highlightedColumn = range.highlight.col;
      });

      if (Array.isArray(this.datarows) && this.datarows.length && this.colHeaders !== null) {
        if (typeof this.datarows[0] === 'object' && !Array.isArray(this.datarows[0])) {
          this.colHeaders = Object.keys(this.datarows[0]);
        }
      }
    },
    onMutation: function () {
      var columns;

      if (this === window) {
        // it is a bug in Polymer or Chrome as of Nov 29, 2013
        return;
      }
      if (!this.instance) {
        // happens in Handsontable WC demo page in Chrome 33-dev
        return;
      }
      columns = parseDatacolumns(this);

      if (columns.length) {
        this.updateSettings({columns: columns});
      }
    }
  });
}());
