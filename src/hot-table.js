(function() {

  var
    publicMethods = ['updateSettings', 'loadData', 'render', 'setDataAtCell', 'setDataAtRowProp', 'getDataAtCell',
      'getDataAtRowProp', 'countRows', 'countCols', 'rowOffset', 'colOffset', 'countVisibleRows', 'countVisibleCols',
      'clear', 'clearUndo', 'getData', 'alter', 'getCell', 'getCellMeta', 'selectCell', 'deselectCell', 'getSelected',
      'getSelectedRange', 'destroyEditor', 'getRowHeader', 'getColHeader', 'destroy', 'isUndoAvailable',
      'isRedoAvailable', 'undo', 'redo', 'countEmptyRows',
      'countEmptyCols', /*'isEmptyRow', 'isEmptyCol', -- those are also publicProperties*/ 'parseSettingsFromDOM',
      'addHook', 'addHookOnce', 'getValue', 'getInstance', 'getSettings'
    ],
    publicHooks = Object.keys(Handsontable.PluginHooks.hooks),
    publicProperties = Object.keys(Handsontable.DefaultSettings.prototype),
    wcDefaults = webComponentDefaults(),
    publish = {}
  ;

  publicProperties = publicProperties.concat(publicHooks);

  function webComponentDefaults() {
    return {
      observeChanges: true
    };
  }

  function parseDataColumns(handsontable) {
    var columns = [],
      i, ilen;

    for (i = 0, ilen = handsontable.childNodes.length; i < ilen; i++) {
      if (handsontable.childNodes[i].nodeName === 'HOT-COLUMN') {
        columns.push(parseDataColumn(handsontable, handsontable.childNodes[i]));
      }
    }

    return columns;
  }

  function parseDataColumn(handsontable, hotcolumn) {
    var obj = {},
      innerHandsontable,
      attrName,
      len,
      val,
      i;

    for (i = 0, len = publicProperties.length; i < len; i++) {
      attrName = publicProperties[i];

      if (attrName === 'data') {
        attrName = 'value';
      }
      else if (attrName === 'title') {
        attrName = 'header';
      }

      if (hotcolumn[attrName] === null) {
        continue; // default value
      }
      else if (hotcolumn[attrName] !== void 0 && hotcolumn[attrName] !== "") {
        val = hotcolumn[attrName];
      }
      else {
        // Dec 3, 2013 - Polymer returns empty string for node properties such as hotcolumn.width
        val = hotcolumn.getAttribute(attrName);
      }

      if (val !== void 0 && val !== handsontable[attrName]) {
        obj[publicProperties[i]] = readOption(hotcolumn, attrName, val);
      }
    }
    innerHandsontable = hotcolumn.getElementsByTagName('hot-table');

    if (innerHandsontable.length) {
      obj.handsontable = parseHandsontable(innerHandsontable[0]);
    }

    return obj;
  }

  /**
   * Get template modal object
   *
   * @param {Element} handsontable
   * @returns {Object}
   */
  function getModel(handsontable) {
    if (handsontable.templateInstance) {
      return handsontable.templateInstance.model;
    }
    else {
      return window;
    }
  }

  function getModelPath(handsontable, path) {
    var model, expression, obj;

    // happens in Polymer when assigning
    // as datarows="{{ model.subpage.people }}" or settings="{{ model.subpage.settings }}
    if (typeof path === 'object' || typeof path === 'function') {
      return path;
    }
    model = getModel(handsontable);
    expression = 'with(model) { ' + path + ';}';
    /* jshint -W061 */
    obj = eval(expression);

    return (obj);
  }

  /**
   * Read hnadsontable option value
   *
   * @param {Element} handsontable hot-table Element
   * @param {String} key
   * @param {*} value
   * @returns {*}
   */
  function readOption(handsontable, key, value) {
    if (key === 'datarows' || key === 'renderer' || key === 'source' || key === 'afterOnCellMouseOver' ||
        publicHooks.indexOf(key) > -1) {
      return getModelPath(handsontable, value);
    }

    return readBool(value);
  }

  /**
   * Read value as Boolean
   *
   * @param {*} val
   * @returns {Boolean}
   */
  function readBool(val) {
    if (val === void 0 || val === 'false') {
      return false;
    }
    else if (val === '' || val === 'true') {
      return true;
    }

    return val;
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

  function parseHandsontable(handsontable) {
    var columns = parseDataColumns(handsontable),
      options = webComponentDefaults(),
      attrName, settingsAttr, i, ilen;

    for (i = 0, ilen = publicProperties.length; i < ilen; i++) {
      attrName = publicProperties[i];

      if (attrName === 'data') {
        attrName = 'datarows';
      }
      options[publicProperties[i]] = readOption(handsontable, attrName, handsontable[attrName]);
    }

    if (handsontable.settings) {
      settingsAttr = getModelPath(handsontable, handsontable.settings);

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

  // Apply public web component method into handsontable
  publicMethods.forEach(function (hotMethod) {
    publish[hotMethod] = function () {
      return this.instance[hotMethod].apply(this.instance, arguments);
    };
  });

  publicProperties.forEach(function (hotProp) {
    var wcProp, val;

    if (publish[hotProp]) {
      return;
    }
    wcProp = hotProp;

    if (hotProp === 'data') {
      wcProp = 'datarows';
    }
    else if (hotProp === 'title') {
      // rename 'title' attribute to 'header' because 'title' was causing
      // problems (https://groups.google.com/forum/#!topic/polymer-dev/RMMsV-D4HVw)
      wcProp = 'header';
    }
    val = wcDefaults[hotProp] === void 0 ? Handsontable.DefaultSettings.prototype[hotProp] : wcDefaults[hotProp];

    if (val === void 0) {
      // Polymer does not like undefined
      publish[wcProp] = null;
    }
    else if (hotProp === 'observeChanges') {
      // on by default
      publish[wcProp] = true;
    }
    else {
      publish[wcProp] = val;
    }

    publish[wcProp + 'Changed'] = function() {
      var settings = {};

      // attribute changed callback called before attached
      if (!this.instance) {
        return;
      }
      if (wcProp === 'settings') {
        settings = getModelPath(this, this[wcProp]);
      }
      else {
        settings[hotProp] = readOption(this, wcProp, this[wcProp]);
      }
      this.updateSettings(settings);
    };
  });

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

    attached: function() {
      var _this = this;

      this.instance = new Handsontable(this.$.htContainer, parseHandsontable(this));

      // TODO: move below to Handsontable
      this.addHook('afterDeselect', function() {
        _this.highlightedRow = -1;
        _this.highlightedColumn = -1;
      });
      this.addHook('afterSelectionEnd', function() {
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
    onMutation: function() {
      var columns;

      if (this === window) {
        // it is a bug in Polymer or Chrome as of Nov 29, 2013
        return;
      }
      if (!this.instance) {
        // happens in Handsontable WC demo page in Chrome 33-dev
        return;
      }
      columns = parseDataColumns(this);

      if (columns.length) {
        this.updateSettings({columns: columns});
      }
    }
  });
}());
