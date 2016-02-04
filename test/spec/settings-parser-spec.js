describe('SettingsParser', function() {

  it('should be defined', function() {
      expect(HotTableUtils.SettingsParser).toBeDefined();
  });

  it('should return object with all available properties', function() {
    var parser = new HotTableUtils.SettingsParser(),
      prop = parser.getAvailableProperties();

    expect(prop.afterCellMetaReset).toBeDefined();
    expect(prop.afterChange).toBeDefined();
    expect(prop.afterChangesObserved).toBeDefined();
    expect(prop.afterColumnMove).toBeDefined();
    expect(prop.afterColumnResize).toBeDefined();
    expect(prop.afterContextMenuDefaultOptions).toBeDefined();
    expect(prop.afterCopyLimit).toBeDefined();
    expect(prop.afterCreateCol).toBeDefined();
    expect(prop.afterCreateRow).toBeDefined();
    expect(prop.afterDeselect).toBeDefined();
    expect(prop.afterDestroy).toBeDefined();
    expect(prop.afterDocumentKeyDown).toBeDefined();
    expect(prop.afterGetCellMeta).toBeDefined();
    expect(prop.afterGetColHeader).toBeDefined();
    expect(prop.afterGetRowHeader).toBeDefined();
    expect(prop.afterInit).toBeDefined();
    expect(prop.afterLoadData).toBeDefined();
    expect(prop.afterMomentumScroll).toBeDefined();
    expect(prop.afterOnCellCornerMouseDown).toBeDefined();
    expect(prop.afterOnCellMouseDown).toBeDefined();
    expect(prop.afterOnCellMouseOver).toBeDefined();
    expect(prop.afterRemoveCol).toBeDefined();
    expect(prop.afterRemoveRow).toBeDefined();
    expect(prop.afterRender).toBeDefined();
    expect(prop.afterRenderer).toBeDefined();
    expect(prop.afterRowMove).toBeDefined();
    expect(prop.afterRowResize).toBeDefined();
    expect(prop.afterScrollHorizontally).toBeDefined();
    expect(prop.afterScrollVertically).toBeDefined();
    expect(prop.afterSelection).toBeDefined();
    expect(prop.afterSelectionByProp).toBeDefined();
    expect(prop.afterSelectionEnd).toBeDefined();
    expect(prop.afterSelectionEndByProp).toBeDefined();
    expect(prop.afterSetCellMeta).toBeDefined();
    expect(prop.afterUpdateSettings).toBeDefined();
    expect(prop.afterValidate).toBeDefined();
    expect(prop.allowInsertColumn).toBeDefined();
    expect(prop.allowInsertRow).toBeDefined();
    expect(prop.allowInvalid).toBeDefined();
    expect(prop.allowRemoveColumn).toBeDefined();
    expect(prop.allowRemoveRow).toBeDefined();
    expect(prop.autoComplete).toBeDefined();
    expect(prop.autoWrapCol).toBeDefined();
    expect(prop.autoWrapRow).toBeDefined();
    expect(prop.beforeAutofill).toBeDefined();
    expect(prop.beforeCellAlignment).toBeDefined();
    expect(prop.beforeChange).toBeDefined();
    expect(prop.beforeChangeRender).toBeDefined();
    expect(prop.beforeDrawBorders).toBeDefined();
    expect(prop.beforeGetCellMeta).toBeDefined();
    expect(prop.beforeInit).toBeDefined();
    expect(prop.beforeInitWalkontable).toBeDefined();
    expect(prop.beforeKeyDown).toBeDefined();
    expect(prop.beforeOnCellMouseDown).toBeDefined();
    expect(prop.beforeRemoveCol).toBeDefined();
    expect(prop.beforeRemoveRow).toBeDefined();
    expect(prop.beforeRender).toBeDefined();
    expect(prop.beforeSetRangeEnd).toBeDefined();
    expect(prop.beforeTouchScroll).toBeDefined();
    expect(prop.beforeValidate).toBeDefined();
    expect(prop.cell).toBeDefined();
    expect(prop.cells).toBeDefined();
    expect(prop.checkedTemplate).toBeDefined();
    expect(prop.class).toBeDefined();
    expect(prop.colHeaders).toBeDefined();
    expect(prop.colWidths).toBeDefined();
    expect(prop.columnSorting).toBeDefined();
    expect(prop.columns).toBeDefined();
    expect(prop.commentedCellClassName).toBeDefined();
    expect(prop.comments).toBeDefined();
    expect(prop.contextMenu).toBeDefined();
    expect(prop.copyColsLimit).toBeDefined();
    expect(prop.copyRowsLimit).toBeDefined();
    expect(prop.copyable).toBeDefined();
    expect(prop.currentColClassName).toBeDefined();
    expect(prop.currentRowClassName).toBeDefined();
    expect(prop.customBorders).toBeDefined();
    expect(prop.dataSchema).toBeDefined();
    expect(prop.datarows).toBeDefined();
    expect(prop.debug).toBeDefined();
    expect(prop.disableVisualSelection).toBeDefined();
    expect(prop.editor).toBeDefined();
    expect(prop.enterBeginsEditing).toBeDefined();
    expect(prop.enterMoves).toBeDefined();
    expect(prop.fillHandle).toBeDefined();
    expect(prop.fixedColumnsLeft).toBeDefined();
    expect(prop.format).toBeDefined();
    expect(prop.fragmentSelection).toBeDefined();
    expect(prop.header).toBeDefined();
    expect(prop.height).toBeDefined();
    expect(prop.invalidCellClassName).toBeDefined();
    expect(prop.isEmptyCol).toBeDefined();
    expect(prop.isEmptyRow).toBeDefined();
    expect(prop.manualColumnFreeze).toBeDefined();
    expect(prop.manualColumnMove).toBeDefined();
    expect(prop.manualColumnResize).toBeDefined();
    expect(prop.manualRowMove).toBeDefined();
    expect(prop.manualRowResize).toBeDefined();
    expect(prop.maxCols).toBeDefined();
    expect(prop.maxRows).toBeDefined();
    expect(prop.mergeCells).toBeDefined();
    expect(prop.minCols).toBeDefined();
    expect(prop.minRows).toBeDefined();
    expect(prop.minSpareCols).toBeDefined();
    expect(prop.minSpareRows).toBeDefined();
    expect(prop.modifyCol).toBeDefined();
    expect(prop.modifyColWidth).toBeDefined();
    expect(prop.modifyRow).toBeDefined();
    expect(prop.modifyRowHeight).toBeDefined();
    expect(prop.multiSelect).toBeDefined();
    expect(prop.noWordWrapClassName).toBeDefined();
    expect(prop.observeDOMVisibility).toBeDefined();
    expect(prop.outsideClickDeselects).toBeDefined();
    expect(prop.pasteMode).toBeDefined();
    expect(prop.persistentState).toBeDefined();
    expect(prop.persistentStateLoad).toBeDefined();
    expect(prop.persistentStateReset).toBeDefined();
    expect(prop.persistentStateSave).toBeDefined();
    expect(prop.placeholder).toBeDefined();
    expect(prop.placeholderCellClassName).toBeDefined();
    expect(prop.readOnly).toBeDefined();
    expect(prop.readOnlyCellClassName).toBeDefined();
    expect(prop.renderer).toBeDefined();
    expect(prop.rowHeaders).toBeDefined();
    expect(prop.search).toBeDefined();
    expect(prop.settings).toBeDefined();
    expect(prop.startCols).toBeDefined();
    expect(prop.startRows).toBeDefined();
    expect(prop.stretchH).toBeDefined();
    expect(prop.tabMoves).toBeDefined();
    expect(prop.trimWhitespace).toBeDefined();
    expect(prop.type).toBeDefined();
    expect(prop.uncheckedTemplate).toBeDefined();
    expect(prop.validator).toBeDefined();
    expect(prop.viewportColumnRenderingOffset).toBeDefined();
    expect(prop.viewportRowRenderingOffset).toBeDefined();
    expect(prop.width).toBeDefined();
    expect(prop.wordWrap).toBeDefined();
  });

  it('should return object with all available properties for <hot-table>', function() {
    var parser = new HotTableUtils.SettingsParser();

    spyOn(parser, 'getAvailableProperties').and.callThrough();

    var prop = parser.getHotTableProperties();

    expect(prop.highlightedRow).toBeDefined();
    expect(prop.highlightedColumn).toBeDefined();

    expect(parser.getAvailableProperties).toHaveBeenCalled();
  });

  it('should return object with all available properties for <hot-column>', function() {
    var parser = new HotTableUtils.SettingsParser();

    spyOn(parser, 'getAvailableProperties').and.callThrough();

    var prop = parser.getHotColumnProperties();

    expect(prop.value).toBeDefined();
    expect(prop.datarows).not.toBeDefined();

    expect(parser.getAvailableProperties).toHaveBeenCalled();
  });

  it('should parse <hot-table> attributes of himself', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot, settings;

    hot = document.createElement('hot-table');
    hot.setAttribute('allow-remove-row', 'false');
    hot.enterMoves = {row: 1, col: 1};
    hot.datarows = [{id: 1, name: 'foo'}];
    hot.setAttribute('copyable', 'false');
    hot.setAttribute('editor', 'false');
    hot.setAttribute('min-cols', '10');
    hot.setAttribute('width', '100');
    settings = parser.parse(hot);

    expect(settings.allowRemoveRow).toBe(false);
    expect(settings.enterMoves).toBe(hot.enterMoves);
    expect(settings.copyable).toBe(false);
    expect(settings.data).toBe(hot.datarows);
    expect(settings.editor).toBe(false);
    expect(settings.minCols).toBe('10');
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
    hotColumn.setAttribute('class', 'custom-class second-class');
    hotColumn.setAttribute('editor', 'false');
    hotColumn.setAttribute('read-only', '');
    hotColumn.setAttribute('read-only-cell-class-name', 'read-only');
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
    hotColumn.setAttribute('class', 'custom-class second-class');
    hotColumn.setAttribute('editor', 'false');
    hotColumn.setAttribute('read-only', '');
    hotColumn.setAttribute('read-only-cell-class-name', 'read-only');
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
    spyOn(parser, 'readBool').and.callThrough();

    expect(parser.readOption(hot, 'className', '')).toBe('');
    expect(parser.readOption(hot, 'className', 'true')).toBe('true');
    expect(parser.readOption(hot, 'someProperty', '')).toBe(true);
    expect(parser.readOption(hot, 'someProperty', 'true')).toBe(true);
    expect(parser.readOption(hot, 'someProperty', 'false')).toBe(false);
    expect(parser.readOption(hot, 'someProperty', void 0)).not.toBeDefined();
    expect(parser.readBool.calls.count()).toEqual(4);

    parser.readOption(hot, 'renderer', 1);
    parser.readOption(hot, 'datarows', 2);
    parser.readOption(hot, 'source', 3);
    parser.readOption(hot, 'dataSchema', 4);
  });

  it('should try to read as boolean if not it returns untouched value', function() {
    var
      parser = new HotTableUtils.SettingsParser();

    expect(parser.readBool('')).toBe(true);
    expect(parser.readBool('true')).toBe(true);
    expect(parser.readBool('foo')).toBe('foo');
    expect(parser.readBool('false')).toBe(false);
    expect(parser.readBool(null)).toBe(null);
    expect(parser.readBool(void 0)).toBe(void 0);
    expect(parser.readBool(12345)).toBe(12345);
  });
});
