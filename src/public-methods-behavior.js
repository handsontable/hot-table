(function(w) {

  var
    publicMethods = [
      'addHook',
      'addHookOnce',
      'alter',
      'clear',
      'clearUndo',
      'colOffset',
      'colToProp',
      'countCols',
      'countEmptyCols',
      'countEmptyRows',
      'countRenderedCols',
      'countRenderedRows',
      'countRows',
      'countVisibleCols',
      'countVisibleRows',
      'deselectCell',
      'destroy',
      'destroyEditor',
      'determineColumnWidth',
      'getCell',
      'getCellEditor',
      'getCellMeta',
      'getCellRenderer',
      'getCellValidator',
      'getColHeader',
      'getColWidth',
      'getCopyableData',
      'getData',
      'getDataAtCell',
      'getDataAtCol',
      'getDataAtProp',
      'getDataAtRow',
      'getDataAtRowProp',
      'getInstance',
      'getRowHeader',
      'getRowHeight',
      'getSchema',
      'getSelected',
      'getSelectedRange',
      'getSettings',
      'getSourceDataAtCol',
      'getSourceDataAtRow',
      'getValue',
      'hasColHeaders',
      'hasRowHeaders',
      'isEmptyCol',
      'isEmptyRow',
      'isListening',
      'isRedoAvailable',
      'isUndoAvailable',
      'listen',
      'loadData',
      'populateFromArray',
      'propToCol',
      'redo',
      'removeCellMeta',
      'removeHook',
      'render',
      'rowOffset',
      'runHooks',
      'selectCell',
      'selectCellByProp',
      'setCellMeta',
      'setCellMetaObject',
      'setDataAtCell',
      'setDataAtRowProp',
      'spliceCol',
      'spliceRow',
      'undo',
      'unlisten',
      'updateSettings',
      'validateCell',
      'validateCells'
    ];

  var PublicMethodsBehavior = {};

  publicMethods.forEach(function(method) {
    PublicMethodsBehavior[method] = function() {
      return this.hot[method].apply(this.hot, arguments);
    };
  });

  w.HotTableUtils = w.HotTableUtils || {};
  w.HotTableUtils.behaviors = w.HotTableUtils.behaviors || {};
  w.HotTableUtils.behaviors.PublicMethodsBehavior = PublicMethodsBehavior;
}(window));
