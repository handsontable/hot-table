describe('SettingsParser', function() {

  it('should be defined', function() {
      expect(HotTableUtils.SettingsParser).toBeDefined();
  });

  it('should return object with defined public methods and properties', function() {
    var parser = new HotTableUtils.SettingsParser(),
      publish = parser.getPublishMethodsAndProps();

    expect(publish.addHook).isFunction();
    expect(publish.addHookOnce).isFunction();

    expect(publish.afterCellMetaReset).toBeDefined();
    expect(publish.afterCellMetaResetChanged).isFunction();

    expect(publish.afterChange).toBeDefined();
    expect(publish.afterChangeChanged).isFunction();

    expect(publish.afterChangesObserved).toBeDefined();
    expect(publish.afterChangesObservedChanged).isFunction();

    expect(publish.afterColumnMove).toBeDefined();
    expect(publish.afterColumnMoveChanged).isFunction();

    expect(publish.afterColumnResize).toBeDefined();
    expect(publish.afterColumnResizeChanged).isFunction();

    expect(publish.afterColumnSort).toBeDefined();
    expect(publish.afterColumnSortChanged).isFunction();

    expect(publish.afterContextMenuDefaultOptions).toBeDefined();
    expect(publish.afterContextMenuDefaultOptionsChanged).isFunction();

    expect(publish.afterCopyLimit).toBeDefined();
    expect(publish.afterCopyLimitChanged).isFunction();

    expect(publish.afterCreateCol).toBeDefined();
    expect(publish.afterCreateColChanged).isFunction();

    expect(publish.afterCreateRow).toBeDefined();
    expect(publish.afterCreateRowChanged).isFunction();

    expect(publish.afterDeselect).toBeDefined();
    expect(publish.afterDeselectChanged).isFunction();

    expect(publish.afterDestroy).toBeDefined();
    expect(publish.afterDestroyChanged).isFunction();

    expect(publish.afterDocumentKeyDown).toBeDefined();
    expect(publish.afterDocumentKeyDownChanged).isFunction();

    expect(publish.afterGetCellMeta).toBeDefined();
    expect(publish.afterGetCellMetaChanged).isFunction();

    expect(publish.afterGetColHeader).toBeDefined();
    expect(publish.afterGetColHeaderChanged).isFunction();

    expect(publish.afterGetRowHeader).toBeDefined();
    expect(publish.afterGetRowHeaderChanged).isFunction();

    expect(publish.afterInit).toBeDefined();
    expect(publish.afterInitChanged).isFunction();

    expect(publish.afterIsMultipleSelectionCheck).toBeDefined();
    expect(publish.afterIsMultipleSelectionCheckChanged).isFunction();

    expect(publish.afterLoadData).toBeDefined();
    expect(publish.afterLoadDataChanged).isFunction();

    expect(publish.afterMomentumScroll).toBeDefined();
    expect(publish.afterMomentumScrollChanged).isFunction();

    expect(publish.afterOnCellCornerMouseDown).toBeDefined();
    expect(publish.afterOnCellCornerMouseDownChanged).isFunction();

    expect(publish.afterOnCellMouseDown).toBeDefined();
    expect(publish.afterOnCellMouseDownChanged).isFunction();

    expect(publish.afterOnCellMouseOver).toBeDefined();
    expect(publish.afterOnCellMouseOverChanged).isFunction();

    expect(publish.afterRemoveCol).toBeDefined();
    expect(publish.afterRemoveColChanged).isFunction();

    expect(publish.afterRemoveRow).toBeDefined();
    expect(publish.afterRemoveRowChanged).isFunction();

    expect(publish.afterRender).toBeDefined();
    expect(publish.afterRenderChanged).isFunction();

    expect(publish.afterRenderer).toBeDefined();
    expect(publish.afterRendererChanged).isFunction();

    expect(publish.afterRowMove).toBeDefined();
    expect(publish.afterRowMoveChanged).isFunction();

    expect(publish.afterRowResize).toBeDefined();
    expect(publish.afterRowResizeChanged).isFunction();

    expect(publish.afterScrollHorizontally).toBeDefined();
    expect(publish.afterScrollHorizontallyChanged).isFunction();

    expect(publish.afterScrollVertically).toBeDefined();
    expect(publish.afterScrollVerticallyChanged).isFunction();

    expect(publish.afterSelection).toBeDefined();
    expect(publish.afterSelectionChanged).isFunction();

    expect(publish.afterSelectionByProp).toBeDefined();
    expect(publish.afterSelectionByPropChanged).isFunction();

    expect(publish.afterSelectionEnd).toBeDefined();
    expect(publish.afterSelectionEndChanged).isFunction();

    expect(publish.afterSelectionEndByProp).toBeDefined();
    expect(publish.afterSelectionEndByPropChanged).isFunction();

    expect(publish.afterSetCellMeta).toBeDefined();
    expect(publish.afterSetCellMetaChanged).isFunction();

    expect(publish.afterUpdateSettings).toBeDefined();
    expect(publish.afterUpdateSettingsChanged).isFunction();

    expect(publish.afterValidate).toBeDefined();
    expect(publish.afterValidateChanged).isFunction();

    expect(publish.allowInsertColumn).toBeDefined();
    expect(publish.allowInsertColumnChanged).isFunction();

    expect(publish.allowInsertRow).toBeDefined();
    expect(publish.allowInsertRowChanged).isFunction();

    expect(publish.allowInvalid).toBeDefined();
    expect(publish.allowInvalidChanged).isFunction();

    expect(publish.allowRemoveColumn).toBeDefined();
    expect(publish.allowRemoveColumnChanged).isFunction();

    expect(publish.allowRemoveRow).toBeDefined();
    expect(publish.allowRemoveRowChanged).isFunction();

    expect(publish.alter).isFunction();

    expect(publish.autoComplete).toBeDefined();
    expect(publish.autoCompleteChanged).isFunction();

    expect(publish.autoWrapCol).toBeDefined();
    expect(publish.autoWrapColChanged).isFunction();

    expect(publish.autoWrapRow).toBeDefined();
    expect(publish.autoWrapRowChanged).isFunction();

    expect(publish.beforeAutofill).toBeDefined();
    expect(publish.beforeAutofillChanged).isFunction();

    expect(publish.beforeCellAlignment).toBeDefined();
    expect(publish.beforeCellAlignmentChanged).isFunction();

    expect(publish.beforeChange).toBeDefined();
    expect(publish.beforeChangeChanged).isFunction();

    expect(publish.beforeChangeRender).toBeDefined();
    expect(publish.beforeChangeRenderChanged).isFunction();

    expect(publish.beforeColumnSort).toBeDefined();
    expect(publish.beforeColumnSortChanged).isFunction();

    expect(publish.beforeDrawBorders).toBeDefined();
    expect(publish.beforeDrawBordersChanged).isFunction();

    expect(publish.beforeGetCellMeta).toBeDefined();
    expect(publish.beforeGetCellMetaChanged).isFunction();

    expect(publish.beforeInit).toBeDefined();
    expect(publish.beforeInitChanged).isFunction();

    expect(publish.beforeInitWalkontable).toBeDefined();
    expect(publish.beforeInitWalkontableChanged).isFunction();

    expect(publish.beforeKeyDown).toBeDefined();
    expect(publish.beforeKeyDownChanged).isFunction();

    expect(publish.beforeOnCellMouseDown).toBeDefined();
    expect(publish.beforeOnCellMouseDownChanged).isFunction();

    expect(publish.beforeRemoveCol).toBeDefined();
    expect(publish.beforeRemoveColChanged).isFunction();

    expect(publish.beforeRemoveRow).toBeDefined();
    expect(publish.beforeRemoveRowChanged).isFunction();

    expect(publish.beforeRender).toBeDefined();
    expect(publish.beforeRenderChanged).isFunction();

    expect(publish.beforeSetRangeEnd).toBeDefined();
    expect(publish.beforeSetRangeEndChanged).isFunction();

    expect(publish.beforeTouchScroll).toBeDefined();
    expect(publish.beforeTouchScrollChanged).isFunction();

    expect(publish.beforeValidate).toBeDefined();
    expect(publish.beforeValidateChanged).isFunction();

    expect(publish.cell).toBeDefined();
    expect(publish.cellChanged).isFunction();

    expect(publish.cells).toBeDefined();
    expect(publish.cellsChanged).isFunction();

    expect(publish.checkedTemplate).toBeDefined();
    expect(publish.checkedTemplateChanged).isFunction();

    expect(publish.className).toBeDefined();
    expect(publish.classNameChanged).isFunction();

    expect(publish.clear).toBeDefined();
    expect(publish.clearUndo).toBeDefined();

    expect(publish.colHeaders).toBeDefined();
    expect(publish.colHeadersChanged).isFunction();

    expect(publish.colOffset).toBeDefined();
    expect(publish.colToProp).toBeDefined();

    expect(publish.colWidths).toBeDefined();
    expect(publish.colWidthsChanged).isFunction();

    expect(publish.columnSorting).toBeDefined();
    expect(publish.columnSortingChanged).isFunction();

    expect(publish.columns).toBeDefined();
    expect(publish.columnsChanged).isFunction();

    expect(publish.commentedCellClassName).toBeDefined();
    expect(publish.commentedCellClassNameChanged).isFunction();

    expect(publish.comments).toBeDefined();
    expect(publish.commentsChanged).isFunction();

    expect(publish.contextMenu).toBeDefined();
    expect(publish.contextMenuChanged).isFunction();

    expect(publish.copyColsLimit).toBeDefined();
    expect(publish.copyColsLimitChanged).isFunction();

    expect(publish.copyRowsLimit).toBeDefined();
    expect(publish.copyRowsLimitChanged).isFunction();

    expect(publish.copyable).toBeDefined();
    expect(publish.copyableChanged).isFunction();

    expect(publish.countCols).toBeDefined();
    expect(publish.countEmptyCols).toBeDefined();
    expect(publish.countEmptyRows).toBeDefined();
    expect(publish.countRenderedCols).toBeDefined();
    expect(publish.countRenderedRows).toBeDefined();
    expect(publish.countRows).toBeDefined();
    expect(publish.countVisibleCols).toBeDefined();
    expect(publish.countVisibleRows).toBeDefined();

    expect(publish.currentColClassName).toBeDefined();
    expect(publish.currentColClassNameChanged).isFunction();

    expect(publish.currentRowClassName).toBeDefined();
    expect(publish.currentRowClassNameChanged).isFunction();

    expect(publish.customBorders).toBeDefined();
    expect(publish.customBordersChanged).isFunction();

    expect(publish.dataSchema).toBeDefined();
    expect(publish.dataSchemaChanged).isFunction();

    expect(publish.datarows).toBeDefined();
    expect(publish.datarowsChanged).isFunction();

    expect(publish.debug).toBeDefined();
    expect(publish.debugChanged).isFunction();

    expect(publish.deselectCell).toBeDefined();
    expect(publish.destroy).toBeDefined();
    expect(publish.destroyEditor).toBeDefined();
    expect(publish.determineColumnWidth).toBeDefined();

    expect(publish.disableVisualSelection).toBeDefined();
    expect(publish.disableVisualSelectionChanged).isFunction();

    expect(publish.editor).toBeDefined();
    expect(publish.editorChanged).isFunction();

    expect(publish.enterBeginsEditing).toBeDefined();
    expect(publish.enterBeginsEditingChanged).isFunction();

    expect(publish.enterMoves).toBeDefined();
    expect(publish.enterMovesChanged).isFunction();

    expect(publish.fillHandle).toBeDefined();
    expect(publish.fillHandleChanged).isFunction();

    expect(publish.fixedColumnsLeft).toBeDefined();
    expect(publish.fixedColumnsLeftChanged).isFunction();

    expect(publish.format).toBeDefined();
    expect(publish.formatChanged).isFunction();

    expect(publish.fragmentSelection).toBeDefined();
    expect(publish.fragmentSelectionChanged).isFunction();

    expect(publish.getCell).isFunction();
    expect(publish.getCellEditor).isFunction();
    expect(publish.getCellMeta).isFunction();
    expect(publish.getCellRenderer).isFunction();
    expect(publish.getCellValidator).isFunction();
    expect(publish.getColHeader).isFunction();
    expect(publish.getColWidth).isFunction();
    expect(publish.getCopyableData).isFunction();
    expect(publish.getData).isFunction();
    expect(publish.getDataAtCell).isFunction();
    expect(publish.getDataAtCol).isFunction();
    expect(publish.getDataAtProp).isFunction();
    expect(publish.getDataAtRow).isFunction();
    expect(publish.getDataAtRowProp).isFunction();
    expect(publish.getInstance).isFunction();
    expect(publish.getRowHeader).isFunction();
    expect(publish.getRowHeight).isFunction();
    expect(publish.getSchema).isFunction();
    expect(publish.getSelected).isFunction();
    expect(publish.getSelectedRange).isFunction();
    expect(publish.getSettings).isFunction();
    expect(publish.getSourceDataAtCol).isFunction();
    expect(publish.getSourceDataAtRow).isFunction();
    expect(publish.getValue).isFunction();

    expect(publish.groups).toBeDefined();
    expect(publish.groupsChanged).isFunction();

    expect(publish.hasColHeaders).isFunction();
    expect(publish.hasRowHeaders).isFunction();

    expect(publish.header).toBeDefined();
    expect(publish.headerChanged).isFunction();

    expect(publish.height).toBeDefined();
    expect(publish.heightChanged).isFunction();

    expect(publish.highlightedColumn).toBe(-1);
    expect(publish.highlightedRow).toBe(-1);
    expect(publish.init).isFunction();

    expect(publish.invalidCellClassName).toBeDefined();
    expect(publish.invalidCellClassNameChanged).isFunction();

    expect(publish.isEmptyCol).isFunction();
    expect(publish.isEmptyColChanged).isFunction();

    expect(publish.isEmptyRow).isFunction();
    expect(publish.isEmptyRowChanged).isFunction();

    expect(publish.isListening).isFunction();
    expect(publish.isRedoAvailable).isFunction();
    expect(publish.isUndoAvailable).isFunction();
    expect(publish.listen).isFunction();
    expect(publish.loadData).isFunction();

    expect(publish.manualColumnFreeze).toBeDefined();
    expect(publish.manualColumnFreezeChanged).isFunction();

    expect(publish.manualColumnMove).toBeDefined();
    expect(publish.manualColumnMoveChanged).isFunction();

    expect(publish.manualColumnResize).toBeDefined();
    expect(publish.manualColumnResizeChanged).isFunction();

    expect(publish.manualRowMove).toBeDefined();
    expect(publish.manualRowMoveChanged).isFunction();

    expect(publish.manualRowResize).toBeDefined();
    expect(publish.manualRowResizeChanged).isFunction();

    expect(publish.maxCols).toBeDefined();
    expect(publish.maxColsChanged).isFunction();

    expect(publish.maxRows).toBeDefined();
    expect(publish.maxRowsChanged).isFunction();

    expect(publish.mergeCells).toBeDefined();
    expect(publish.mergeCellsChanged).isFunction();

    expect(publish.minCols).toBeDefined();
    expect(publish.minColsChanged).isFunction();

    expect(publish.minRows).toBeDefined();
    expect(publish.minRowsChanged).isFunction();

    expect(publish.minSpareCols).toBeDefined();
    expect(publish.minSpareColsChanged).isFunction();

    expect(publish.minSpareRows).toBeDefined();
    expect(publish.minSpareRowsChanged).isFunction();

    expect(publish.modifyCol).toBeDefined();
    expect(publish.modifyColChanged).isFunction();

    expect(publish.modifyColWidth).toBeDefined();
    expect(publish.modifyColWidthChanged).isFunction();

    expect(publish.modifyRow).toBeDefined();
    expect(publish.modifyRowChanged).isFunction();

    expect(publish.modifyRowHeight).toBeDefined();
    expect(publish.modifyRowHeightChanged).isFunction();

    expect(publish.multiSelect).toBeDefined();
    expect(publish.multiSelectChanged).isFunction();

    expect(publish.noWordWrapClassName).toBeDefined();
    expect(publish.noWordWrapClassNameChanged).isFunction();

    expect(publish.observeDOMVisibility).toBeDefined();
    expect(publish.observeDOMVisibilityChanged).isFunction();

    expect(publish.outsideClickDeselects).toBeDefined();
    expect(publish.outsideClickDeselectsChanged).isFunction();

    expect(publish.pasteMode).toBeDefined();
    expect(publish.pasteModeChanged).isFunction();

    expect(publish.persistentState).toBeDefined();
    expect(publish.persistentStateChanged).isFunction();

    expect(publish.persistentStateLoad).toBeDefined();
    expect(publish.persistentStateLoadChanged).isFunction();

    expect(publish.persistentStateReset).toBeDefined();
    expect(publish.persistentStateResetChanged).isFunction();

    expect(publish.persistentStateSave).toBeDefined();
    expect(publish.persistentStateSaveChanged).isFunction();

    expect(publish.placeholder).toBeDefined();
    expect(publish.placeholderChanged).isFunction();

    expect(publish.placeholderCellClassName).toBeDefined();
    expect(publish.placeholderCellClassNameChanged).isFunction();

    expect(publish.populateFromArray).isFunction();
    expect(publish.propToCol).isFunction();

    expect(publish.readOnly).toBeDefined();
    expect(publish.readOnlyChanged).isFunction();

    expect(publish.readOnlyCellClassName).toBeDefined();
    expect(publish.readOnlyCellClassNameChanged).isFunction();

    expect(publish.redo).isFunction();
    expect(publish.removeCellMeta).isFunction();
    expect(publish.removeHook).isFunction();
    expect(publish.render).isFunction();

    expect(publish.renderer).toBeDefined();
    expect(publish.rendererChanged).isFunction();

    expect(publish.rowHeaders).toBeDefined();
    expect(publish.rowHeadersChanged).isFunction();

    expect(publish.rowOffset).isFunction();
    expect(publish.runHooks).isFunction();

    expect(publish.search).toBeDefined();
    expect(publish.searchChanged).isFunction();

    expect(publish.selectCell).isFunction();
    expect(publish.selectCellByProp).isFunction();
    expect(publish.setCellMeta).isFunction();
    expect(publish.setCellMetaObject).isFunction();
    expect(publish.setDataAtCell).isFunction();
    expect(publish.setDataAtRowProp).isFunction();

    expect(publish.settings).toBeDefined();
    expect(publish.settingsChanged).isFunction();

    expect(publish.spliceCol).isFunction();
    expect(publish.spliceRow).isFunction();
    expect(publish.spliceRow).isFunction();

    expect(publish.startCols).toBeDefined();
    expect(publish.startColsChanged).isFunction();

    expect(publish.startRows).toBeDefined();
    expect(publish.startRowsChanged).isFunction();

    expect(publish.stretchH).toBeDefined();
    expect(publish.stretchHChanged).isFunction();

    expect(publish.tabMoves).toBeDefined();
    expect(publish.tabMovesChanged).isFunction();

    expect(publish.trimWhitespace).toBeDefined();
    expect(publish.trimWhitespaceChanged).isFunction();

    expect(publish.type).toBeDefined();
    expect(publish.typeChanged).isFunction();

    expect(publish.uncheckedTemplate).toBeDefined();
    expect(publish.uncheckedTemplateChanged).isFunction();

    expect(publish.undo).isFunction();
    expect(publish.unlisten).isFunction();
    expect(publish.updateSettings).isFunction();
    expect(publish.validateCell).isFunction();
    expect(publish.validateCells).isFunction();

    expect(publish.validator).toBeDefined();
    expect(publish.validatorChanged).isFunction();

    expect(publish.viewportColumnRenderingOffset).toBeDefined();
    expect(publish.viewportColumnRenderingOffsetChanged).isFunction();

    expect(publish.viewportRowRenderingOffset).toBeDefined();
    expect(publish.viewportRowRenderingOffsetChanged).isFunction();

    expect(publish.width).toBeDefined();
    expect(publish.widthChanged).isFunction();

    expect(publish.wordWrap).toBeDefined();
    expect(publish.wordWrapChanged).isFunction();
  });

  it('should parse <hot-table> attributes himself', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot, settings;

    hot = document.createElement('hot-table');
    hot.setAttribute('allowRemoveRow', 'false');
    hot.enterMoves = {row: 1, col: 1};
    hot.datarows = [{id: 1, name: 'foo'}];
    hot.setAttribute('copyable', 'false');
    hot.setAttribute('editor', 'false');
    hot.setAttribute('minCols', '10');
    hot.setAttribute('width', '100');
    settings = parser.parse(hot);

    expect(settings.allowRemoveRow).toBe(false);
    expect(settings.enterMoves).toBe(hot.enterMoves);
    expect(settings.copyable).toBe(false);
    expect(settings.data).toBe(hot.datarows);
    expect(settings.editor).toBe(false);
    expect(settings.minCols).toBe(10);
    expect(settings.width).toBe('100');
  });

  it('should parse <hot-table> columns attributes', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot, hotColumn, columns;

    hot = document.createElement('hot-table');
    columns = parser.parseColumns(hot);

    expect(columns.length).toBe(0);

    hotColumn = document.createElement('hot-column');
    hotColumn.classList.add('custom-class');
    hotColumn.classList.add('second-class');
    hotColumn.setAttribute('editor', 'false');
    hotColumn.setAttribute('readOnly', 'true');
    hotColumn.setAttribute('readOnlyCellClassName', 'read-only');
    hot.appendChild(hotColumn);
    columns = parser.parseColumns(hot);

    expect(columns.length).toBe(1);
    expect(columns[0].className).toBe('custom-class second-class');
    expect(columns[0].editor).toBe(false);
    expect(columns[0].readOnly).toBe(true);
    expect(columns[0].readOnlyCellClassName).toBe('read-only');
  });

  it('should parse <hot-table> single column attributes', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot, hotColumn, columns;

    hot = document.createElement('hot-table');
    columns = parser.parseColumns(hot);

    expect(columns.length).toBe(0);

    hotColumn = document.createElement('hot-column');
    hotColumn.classList.add('custom-class');
    hotColumn.classList.add('second-class');
    hotColumn.setAttribute('editor', 'false');
    hotColumn.setAttribute('readOnly', 'true');
    hotColumn.setAttribute('readOnlyCellClassName', 'read-only');
    hot.appendChild(hotColumn);
    columns = parser.parseColumn(hot, hotColumn);

    expect(columns.className).toBe('custom-class second-class');
    expect(columns.editor).toBe(false);
    expect(columns.readOnly).toBe(true);
    expect(columns.readOnlyCellClassName).toBe('read-only');
  });

  it('should read table options in correct way', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot;

    hot = document.createElement('hot-table');
    spyOn(parser, 'getModelPath');
    spyOn(parser, 'readBool').and.callThrough();

    expect(parser.readOption(hot, 'className', '')).toBe('');
    expect(parser.readOption(hot, 'className', 'true')).toBe('true');
    expect(parser.readOption(hot, 'someProperty', '')).toBe(true);
    expect(parser.readOption(hot, 'someProperty', 'true')).toBe(true);
    expect(parser.readOption(hot, 'someProperty', 'false')).toBe(false);
    expect(parser.readOption(hot, 'someProperty', undefined)).toBe(false);
    expect(parser.getModelPath.calls.count()).toEqual(0);
    expect(parser.readBool.calls.count()).toEqual(4);

    parser.readOption(hot, 'renderer', 1);
    parser.readOption(hot, 'datarows', 2);
    parser.readOption(hot, 'source', 3);
    parser.readOption(hot, 'dataSchema', 4);

    expect(parser.getModelPath.calls.count()).toBe(4);
    expect(parser.getModelPath.calls.mostRecent().args[0]).toBe(hot);
    expect(parser.getModelPath.calls.mostRecent().args[1]).toBe(4);
  });

  it('should try to read as boolean if not it returns untouched value', function() {
    var
      parser = new HotTableUtils.SettingsParser();

    expect(parser.readBool('')).toBe(true);
    expect(parser.readBool('true')).toBe(true);
    expect(parser.readBool('foo')).toBe('foo');
    expect(parser.readBool('false')).toBe(false);
    expect(parser.readBool(null)).toBe(null);
    expect(parser.readBool(undefined)).toBe(false);
    expect(parser.readBool(12345)).toBe(12345);
  });

  it('should filter object from null values', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      obj, result;

    obj = {a: 1, b: 'foo', c: function(){}, d: {}, e: [], f: null, h: undefined};
    result = parser.filterNonNull(obj);
    delete obj.f;

    expect(result).toEqual(obj);
  });

  it('should get template model from element if it exists', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      fakeHot, model;

    model = {a: 1};
    fakeHot = {
      templateInstance: {model: model}
    };

    expect(parser.getModel(fakeHot)).toBe(model);
    expect(parser.getModel({})).toBe(window);
  });

  it('should get model value based on path (e.g.: {{ obj.a.b }})', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      fakeHot, model;

    model = {a: {b: {c: 1}}};
    fakeHot = {
      templateInstance: {model: model}
    };

    expect(parser.getModelPath(fakeHot, 'a.b.c')).toBe(model.a.b.c);
    expect(parser.getModelPath(fakeHot, 'a.b')).toBe(model.a.b);
    expect(parser.getModelPath(fakeHot, 'a')).toBe(model.a);
    expect(parser.getModelPath(fakeHot, '')).toBe(undefined);
  });
});
