describe('PublicMethodsBehavior', function() {

  it('should be defined', function() {
      expect(HotTableUtils.behaviors.PublicMethodsBehavior).toBeDefined();
  });

  it('should return object with all available methods', function() {
    var o = HotTableUtils.behaviors.PublicMethodsBehavior;

    expect(o.addHook).toBeFunction();
    expect(o.addHookOnce).toBeFunction();
    expect(o.alter).toBeFunction();
    expect(o.clear).toBeFunction();
    expect(o.clearUndo).toBeFunction();
    expect(o.colOffset).toBeFunction();
    expect(o.colToProp).toBeFunction();
    expect(o.countCols).toBeFunction();
    expect(o.countEmptyCols).toBeFunction();
    expect(o.countEmptyRows).toBeFunction();
    expect(o.countRenderedCols).toBeFunction();
    expect(o.countRenderedRows).toBeFunction();
    expect(o.countRows).toBeFunction();
    expect(o.countVisibleCols).toBeFunction();
    expect(o.countVisibleRows).toBeFunction();
    expect(o.deselectCell).toBeFunction();
    expect(o.destroy).toBeFunction();
    expect(o.destroyEditor).toBeFunction();
    expect(o.getCell).toBeFunction();
    expect(o.getCellEditor).toBeFunction();
    expect(o.getCellMeta).toBeFunction();
    expect(o.getCellRenderer).toBeFunction();
    expect(o.getCellValidator).toBeFunction();
    expect(o.getColHeader).toBeFunction();
    expect(o.getColWidth).toBeFunction();
    expect(o.getCopyableData).toBeFunction();
    expect(o.getData).toBeFunction();
    expect(o.getDataAtCell).toBeFunction();
    expect(o.getDataAtCol).toBeFunction();
    expect(o.getDataAtProp).toBeFunction();
    expect(o.getDataAtRow).toBeFunction();
    expect(o.getDataAtRowProp).toBeFunction();
    expect(o.getInstance).toBeFunction();
    expect(o.getRowHeader).toBeFunction();
    expect(o.getRowHeight).toBeFunction();
    expect(o.getSchema).toBeFunction();
    expect(o.getSelected).toBeFunction();
    expect(o.getSelectedRange).toBeFunction();
    expect(o.getSettings).toBeFunction();
    expect(o.getSourceDataAtCol).toBeFunction();
    expect(o.getSourceDataAtRow).toBeFunction();
    expect(o.getValue).toBeFunction();
    expect(o.hasColHeaders).toBeFunction();
    expect(o.hasRowHeaders).toBeFunction();
    expect(o.isListening).toBeFunction();
    expect(o.isRedoAvailable).toBeFunction();
    expect(o.isUndoAvailable).toBeFunction();
    expect(o.listen).toBeFunction();
    expect(o.loadData).toBeFunction();
    expect(o.populateFromArray).toBeFunction();
    expect(o.propToCol).toBeFunction();
    expect(o.redo).toBeFunction();
    expect(o.removeCellMeta).toBeFunction();
    expect(o.removeHook).toBeFunction();
    expect(o.render).toBeFunction();
    expect(o.rowOffset).toBeFunction();
    expect(o.runHooks).toBeFunction();
    expect(o.selectCell).toBeFunction();
    expect(o.selectCellByProp).toBeFunction();
    expect(o.setCellMeta).toBeFunction();
    expect(o.setCellMetaObject).toBeFunction();
    expect(o.setDataAtCell).toBeFunction();
    expect(o.setDataAtRowProp).toBeFunction();
    expect(o.spliceCol).toBeFunction();
    expect(o.spliceRow).toBeFunction();
    expect(o.undo).toBeFunction();
    expect(o.unlisten).toBeFunction();
    expect(o.updateSettings).toBeFunction();
    expect(o.validateCell).toBeFunction();
    expect(o.validateCells).toBeFunction();

    // fake Handsontable instance
    o.hot = {addHook: function() {return 'foo';}};

    spyOn(o.hot, 'addHook').and.callThrough();

    expect(o.addHook(1, 2, 3)).toBe('foo');
    expect(o.hot.addHook).toHaveBeenCalledWith(1, 2, 3);
  });
});

