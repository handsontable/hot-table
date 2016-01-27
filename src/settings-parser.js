(function(w) {
  var
    publicHooks = Handsontable.hooks.getRegistered(),
    publicOptions = Object.keys(Handsontable.DefaultSettings.prototype),
    publicProperties = []
  ;

  publicProperties = publicProperties.concat(publicOptions, publicHooks);

  /**
   * @constructor
   */
  function SettingsParser() {}

  /**
   * Get handsontable properties.
   *
   * @returns {Object}
   */
  SettingsParser.prototype.getAvailableProperties = function() {
    var publish = {};

    publicProperties.forEach(function(prop) {
      if (publish[prop]) {
        return;
      }
      var defaultValue = Handsontable.DefaultSettings.prototype[prop];

      if (prop === 'data') {
        prop = 'datarows';

      }  else if (prop === 'className') {
        prop = 'class';

      }  else if (prop === 'title') {
        // rename 'title' attribute to 'header' because 'title' was causing
        // problems (https://groups.google.com/forum/#!topic/polymer-dev/RMMsV-D4HVw)
        prop = 'header';
      }
      publish[prop] = {
        observer: '_onChanged'
      };
      if (prop === 'settings' || prop === 'source' || prop === 'datarows') {
        publish[prop].type = Object;
      }

      if (typeof defaultValue === 'function') {
        publish[prop].value = function() {
          return function() {
            return defaultValue.apply(this.hot || this, arguments);
          };
        };
      } else if (defaultValue !== void 0) {
        publish[prop].value = defaultValue;
      }
    });

    return publish;
  };

  /**
   * Get handsontable properties.
   *
   * @returns {Object}
   */
  SettingsParser.prototype.getHotTableProperties = function() {
    var props = this.getAvailableProperties();

    props.highlightedRow = {
      type: Number,
      value: -1,
      notify: true,
    };
    props.highlightedColumn = {
      type: Number,
      value: -1,
      notify: true,
    };
    props.id = {
      type: String,
      value: '',
      notify: false,
    };

    return props;
  };

  /**
   * Get handsontable properties.
   *
   * @returns {Object}
   */
  SettingsParser.prototype.getHotColumnProperties = function() {
    var props = this.getAvailableProperties();

    delete props.datarows;
    props.value = {
      observer: '_onChanged'
    };

    return props;
  };

  /**
   * Parse hot-table to build handsontable settings object
   *
   * @param {HTMLElement} hotTable
   * @returns {Object}
   */
  SettingsParser.prototype.parse = function(hotTable) {
    var columns = this.parseColumns(hotTable),
      options = {},
      attrName, i, iLen;

    for (i = 0, iLen = publicProperties.length; i < iLen; i++) {
      attrName = publicProperties[i];

      if (attrName === 'data') {
        attrName = 'datarows';
      }
      options[publicProperties[i]] = this.readOption(hotTable, attrName, hotTable[attrName]);
    }

    if (hotTable.settings) {
      for (i in hotTable.settings) {
        if (hotTable.settings.hasOwnProperty(i)) {
          options[i] = hotTable.settings[i];
        }
      }
    }
    if (columns.length) {
      options.columns = columns;
    }
    options.observeChanges = true;

    return options;
  };

  /**
   * Parse hot-table columns (hot-column) to build handsontable columns settings object
   *
   * @param {HTMLElement} hotTable
   * @returns {Array}
   */
  SettingsParser.prototype.parseColumns = function(hotTable) {
    var columns = [],
      i, iLen;

    for (i = 0, iLen = hotTable.childNodes.length; i < iLen; i++) {
      if (hotTable.childNodes[i].nodeName === 'HOT-COLUMN') {
        columns.push(this.parseColumn(hotTable, hotTable.childNodes[i]));
      }
    }

    return columns;
  };

  /**
   * Parse hot-column to build handsontable column settings object
   *
   * @param {HTMLElement} hotTable
   * @param {HTMLElement} hotColumn
   * @returns {Object}
   */
  SettingsParser.prototype.parseColumn = function(hotTable, hotColumn) {
    var object = {},
      innerHotTable,
      attrName,
      len,
      val,
      i;

    for (i = 0, len = publicOptions.length; i < len; i++) {
      attrName = publicOptions[i];

      if (attrName === 'data') {
        attrName = 'value';

      } else if (attrName === 'title') {
        attrName = 'header';

      } else if (attrName === 'className') {
        attrName = 'class';
      }
      val = hotColumn[attrName];

      if (val !== void 0 && val !== hotTable[attrName]) {
        object[publicOptions[i]] = this.readOption(hotColumn, attrName, val);
      }
    }
    innerHotTable = hotColumn.getElementsByTagName('hot-table');

    if (innerHotTable.length) {
      object.handsontable = new Settings(innerHotTable[0]).parse();
    }

    return object;
  };

  /**
   * Read hot-table single option (attribute)
   *
   * @param {HTMLElement} hotTable
   * @param {String} key
   * @param {*} value
   * @returns {*}
   */
  SettingsParser.prototype.readOption = function(hotTable, key, value) {
    if (key === 'datarows' || key === 'renderer' || key === 'source' || key === 'dataSchema' || key === 'className') {
      return value;
    }
    value = this.readBool(value);

    return value;
  };

  /**
   * Try to read value as boolean if not return untouched value
   *
   * @param {*} value
   * @returns {*}
   */
  SettingsParser.prototype.readBool = function(value) {
    if (value === 'false') {
      return false;

    } else if (value === '' || value === 'true') {
      return true;
    }

    return value;
  };

  w.HotTableUtils = w.HotTableUtils || {};
  w.HotTableUtils.SettingsParser = SettingsParser;

}(window));
