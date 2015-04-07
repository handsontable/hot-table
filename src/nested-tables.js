(function(w) {

  /**
   * @param {HTMLElement} hotTable
   * @constructor
   */
  function NestedTable(hotTable) {
    this.hotTable = hotTable;
  }

  /**
   * @param {String} strategyName
   * @param {HTMLElement} parentTable
   */
  NestedTable.prototype.setStrategy = function(strategyName, parentTable) {
    var strategy;

    if (strategyName === 'native') {
      strategy = new NativeSupport(parentTable);

    } else if (strategyName === 'emulation') {
      strategy = new EmulationSupport(parentTable);

    } else {
      throw new Error('Strategy name (' + strategyName + ') is not supported');
    }
    this.strategy = strategy;
  };

  /**
   * Push founded nested table to collection
   *
   * @param {HTMLElement} hotTable
   */
  NestedTable.prototype.push = function(hotTable) {
    if (this.strategy.tables.indexOf(hotTable) === -1) {
      this.strategy.tables.push(hotTable);
    }
  };

  /**
   * Get tables
   *
   * @returns {Array}
   */
  NestedTable.prototype.getTables = function() {
    return this.strategy.tables;
  };

  /**
   * Collect tables
   */
  NestedTable.prototype.update = function() {
    this.strategy.update(this.hotTable);
  };

  /**
   * Checks if HOT instance belongs to the nested tables
   *
   * @param {Handsontable} hotInstance
   * @returns {Boolean}
   */
  NestedTable.prototype.isNested = function(hotInstance) {
    function isNestedTable(nestedTable, hotInstance) {
      var result = false,
        tables = nestedTable.getTables();

      for (var i = 0, len = tables.length; i < len; i++) {
        if (wrap(tables[i]).instance === hotInstance) {
          result = true;
          break;
        }
        if (isNestedTable(wrap(tables[i]).nestedTables, hotInstance)) {
          result = true;
          break;
        }
      }

      return result;
    }

    return isNestedTable(this, hotInstance);
  };

  /**
   * Strategy for browsers which support web components natively
   *
   * @param {HTMLElement} hotParentTable
   * @constructor
   */
  function NativeSupport(hotParentTable) {
    this.hotParentTable = hotParentTable;
    this.tables = [];
    this.totalLength = 0;
  }

  /**
   * @param {HTMLElement} hotTable
   */
  NativeSupport.prototype.update = function(hotTable) {
    var hotTables = hotTable.instance.rootElement.querySelectorAll('hot-table'),
      index = hotTables.length,
      parentTable;

    if (index) {
      this.totalLength = hotTables[index - 1].nestedTables.totalLength;
    }
    while (index --) {
      this.totalLength ++;
      this.tables.unshift(hotTables[index]);
    }
    // On table new col/row insert update nested tables collection
    parentTable = Handsontable.Dom.closest(hotTable.parentNode, ['HOT-TABLE']);

    if (parentTable && parentTable.nestedTables) {
      parentTable.nestedTables.push(hotTable);
    }
  };

  /**
   * Strategy for browsers which not support web components natively (emulation from polymer)
   *
   * @param {HTMLElement} hotParentTable
   * @constructor
   */
  function EmulationSupport(hotParentTable) {
    this.hotParentTable = hotParentTable;
    this.tables = [];
    this.totalLength = 0;
  }

  /**
   * @param {HTMLElement} hotTable
   */
  EmulationSupport.prototype.update = function(hotTable) {
    var latestParent = null;

    if (this.hotParentTable && this.hotParentTable === hotTable) {
      hotTable.addEventListener('initialize', function(event) {
        var target, parent;

        event = unwrap(event);
        target = event.target;

        if (target === unwrap(hotTable)) {
          latestParent = target;

          return;
        }
        parent = Handsontable.Dom.closest(target.parentNode, ['HOT-TABLE']);

        if (parent === latestParent) {
          wrap(latestParent).nestedTables.push(target);

        } else {
          latestParent = parent;
          wrap(parent).nestedTables.push(target);
        }
      });
    }
    hotTable.fire('initialize');
  };


  w.HotTableUtils = w.HotTableUtils || {};
  w.HotTableUtils.NestedTable = NestedTable;

}(window));
