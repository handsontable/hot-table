suite('SettingsParser', function() {

  test('should be defined', function() {
      assert.isDefined(HotTableUtils.SettingsParser);
  });

  test('should return object with all available properties', function() {
    var parser = new HotTableUtils.SettingsParser(),
      prop = parser.getAvailableProperties();

    assert.isDefined(prop.afterCellMetaReset);
    assert.isDefined(prop.afterChange);
    assert.isDefined(prop.afterChangesObserved);
    assert.isDefined(prop.afterColumnMove);
    assert.isDefined(prop.afterColumnResize);
    assert.isDefined(prop.afterContextMenuDefaultOptions);
    assert.isDefined(prop.afterCopyLimit);
    assert.isDefined(prop.afterCreateCol);
    assert.isDefined(prop.afterCreateRow);
    assert.isDefined(prop.afterDeselect);
    assert.isDefined(prop.afterDestroy);
    assert.isDefined(prop.afterDocumentKeyDown);
    assert.isDefined(prop.afterGetCellMeta);
    assert.isDefined(prop.afterGetColHeader);
    assert.isDefined(prop.afterGetRowHeader);
    assert.isDefined(prop.afterInit);
    assert.isDefined(prop.afterLoadData);
    assert.isDefined(prop.afterMomentumScroll);
    assert.isDefined(prop.afterOnCellCornerMouseDown);
    assert.isDefined(prop.afterOnCellMouseDown);
    assert.isDefined(prop.afterOnCellMouseOver);
    assert.isDefined(prop.afterRemoveCol);
    assert.isDefined(prop.afterRemoveRow);
    assert.isDefined(prop.afterRender);
    assert.isDefined(prop.afterRenderer);
    assert.isDefined(prop.afterRowMove);
    assert.isDefined(prop.afterRowResize);
    assert.isDefined(prop.afterScrollHorizontally);
    assert.isDefined(prop.afterScrollVertically);
    assert.isDefined(prop.afterSelection);
    assert.isDefined(prop.afterSelectionByProp);
    assert.isDefined(prop.afterSelectionEnd);
    assert.isDefined(prop.afterSelectionEndByProp);
    assert.isDefined(prop.afterSetCellMeta);
    assert.isDefined(prop.afterUpdateSettings);
    assert.isDefined(prop.afterValidate);
    assert.isDefined(prop.allowInsertColumn);
    assert.isDefined(prop.allowInsertRow);
    assert.isDefined(prop.allowInvalid);
    assert.isDefined(prop.allowRemoveColumn);
    assert.isDefined(prop.allowRemoveRow);
    assert.isDefined(prop.autoComplete);
    assert.isDefined(prop.autoWrapCol);
    assert.isDefined(prop.autoWrapRow);
    assert.isDefined(prop.beforeAutofill);
    assert.isDefined(prop.beforeCellAlignment);
    assert.isDefined(prop.beforeChange);
    assert.isDefined(prop.beforeChangeRender);
    assert.isDefined(prop.beforeDrawBorders);
    assert.isDefined(prop.beforeGetCellMeta);
    assert.isDefined(prop.beforeInit);
    assert.isDefined(prop.beforeInitWalkontable);
    assert.isDefined(prop.beforeKeyDown);
    assert.isDefined(prop.beforeOnCellMouseDown);
    assert.isDefined(prop.beforeRemoveCol);
    assert.isDefined(prop.beforeRemoveRow);
    assert.isDefined(prop.beforeRender);
    assert.isDefined(prop.beforeSetRangeEnd);
    assert.isDefined(prop.beforeTouchScroll);
    assert.isDefined(prop.beforeValidate);
    assert.isDefined(prop.cell);
    assert.isDefined(prop.cells);
    assert.isDefined(prop.checkedTemplate);
    assert.isDefined(prop.class);
    assert.isDefined(prop.colHeaders);
    assert.isDefined(prop.colWidths);
    assert.isDefined(prop.columnSorting);
    assert.isDefined(prop.columns);
    assert.isDefined(prop.commentedCellClassName);
    assert.isDefined(prop.comments);
    assert.isDefined(prop.contextMenu);
    assert.isDefined(prop.copyColsLimit);
    assert.isDefined(prop.copyRowsLimit);
    assert.isDefined(prop.copyable);
    assert.isDefined(prop.currentColClassName);
    assert.isDefined(prop.currentRowClassName);
    assert.isDefined(prop.customBorders);
    assert.isDefined(prop.dataSchema);
    assert.isDefined(prop.datarows);
    assert.isDefined(prop.debug);
    assert.isDefined(prop.disableVisualSelection);
    assert.isDefined(prop.editor);
    assert.isDefined(prop.enterBeginsEditing);
    assert.isDefined(prop.enterMoves);
    assert.isDefined(prop.fillHandle);
    assert.isDefined(prop.fixedColumnsLeft);
    assert.isDefined(prop.format);
    assert.isDefined(prop.fragmentSelection);
    assert.isDefined(prop.header);
    assert.isDefined(prop.height);
    assert.isDefined(prop.invalidCellClassName);
    assert.isDefined(prop.isEmptyCol);
    assert.isDefined(prop.isEmptyRow);
    assert.isDefined(prop.manualColumnFreeze);
    assert.isDefined(prop.manualColumnMove);
    assert.isDefined(prop.manualColumnResize);
    assert.isDefined(prop.manualRowMove);
    assert.isDefined(prop.manualRowResize);
    assert.isDefined(prop.maxCols);
    assert.isDefined(prop.maxRows);
    assert.isDefined(prop.mergeCells);
    assert.isDefined(prop.minCols);
    assert.isDefined(prop.minRows);
    assert.isDefined(prop.minSpareCols);
    assert.isDefined(prop.minSpareRows);
    assert.isDefined(prop.modifyCol);
    assert.isDefined(prop.modifyColWidth);
    assert.isDefined(prop.modifyRow);
    assert.isDefined(prop.modifyRowHeight);
    assert.isDefined(prop.multiSelect);
    assert.isDefined(prop.noWordWrapClassName);
    assert.isDefined(prop.observeDOMVisibility);
    assert.isDefined(prop.outsideClickDeselects);
    assert.isDefined(prop.pasteMode);
    assert.isDefined(prop.persistentState);
    assert.isDefined(prop.persistentStateLoad);
    assert.isDefined(prop.persistentStateReset);
    assert.isDefined(prop.persistentStateSave);
    assert.isDefined(prop.placeholder);
    assert.isDefined(prop.placeholderCellClassName);
    assert.isDefined(prop.readOnly);
    assert.isDefined(prop.readOnlyCellClassName);
    assert.isDefined(prop.renderer);
    assert.isDefined(prop.rowHeaders);
    assert.isDefined(prop.search);
    assert.isDefined(prop.settings);
    assert.isDefined(prop.startCols);
    assert.isDefined(prop.startRows);
    assert.isDefined(prop.stretchH);
    assert.isDefined(prop.tabMoves);
    assert.isDefined(prop.trimWhitespace);
    assert.isDefined(prop.type);
    assert.isDefined(prop.uncheckedTemplate);
    assert.isDefined(prop.validator);
    assert.isDefined(prop.viewportColumnRenderingOffset);
    assert.isDefined(prop.viewportRowRenderingOffset);
    assert.isDefined(prop.width);
    assert.isDefined(prop.wordWrap);
  });

  test('should return object with all available properties for <hot-table>', function() {
    var parser = new HotTableUtils.SettingsParser();

    sinon.spy(parser, 'getAvailableProperties');
    // spyOn(parser, 'getAvailableProperties').and.callThrough();

    var prop = parser.getHotTableProperties();

    // assert.isDefined(prop.highlightedRow);
    // assert.isDefined(prop.highlightedColumn);

    asset(parser.getAvailableProperties.calledOnce);
  });

  test('should return object with all available properties for <hot-column>', function() {
    var parser = new HotTableUtils.SettingsParser();

    spyOn(parser, 'getAvailableProperties').and.callThrough();

    var prop = parser.getHotColumnProperties();

    assert.isDefined(prop.value);
    assert.isUndefined(prop.datarows);

    expect(parser.getAvailableProperties).toHaveBeenCalled();
  });

  test('should parse <hot-table> attributes of himself', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot, settings;

    hot = createHotTable();
    hot.setAttribute('allow-remove-row', 'false');
    hot.enterMoves = {row: 1, col: 1};
    hot.datarows = [{id: 1, name: 'foo'}];
    hot.setAttribute('copyable', 'false');
    hot.setAttribute('editor', 'false');
    hot.setAttribute('min-cols', '10');
    hot.setAttribute('width', '100');
    settings = parser.parse(hot);

    assert.isFalse(settings.allowRemoveRow);
    assert.equal(settings.enterMoves, hot.enterMoves);
    assert.isFalse(settings.copyable);
    assert.equal(settings.data, hot.datarows);
    assert.isFalse(settings.editor);
    assert.equal(settings.minCols, '10');
    assert.equal(settings.width, '100');
  });

  test('should parse <hot-table> columns attributes', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot, hotColumn, columns;

    hot = createHotTable();
    columns = parser.parseColumns(hot);

    expect(columns.length).toBe(0);

    hotColumn = document.createElement('hot-column');
    hotColumn.setAttribute('class', 'custom-class second-class');
    hotColumn.setAttribute('editor', 'false');
    hotColumn.setAttribute('read-only', '');
    hotColumn.setAttribute('read-only-cell-class-name', 'read-only');
    hot.appendChild(hotColumn);
    columns = parser.parseColumns(hot);

    assert.equal(columns.length, 1);
    assert.equal(columns[0].className, 'custom-class second-class');
    assert.isFalse(columns[0].editor);
    assert.isTrue(columns[0].readOnly);
    assert.equal(columns[0].readOnlyCellClassName, 'read-only');
  });

  test('should parse <hot-table> single column attributes', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot, hotColumn, columns;

    hot = createHotTable();
    columns = parser.parseColumns(hot);

    expect(columns.length).toBe(0);

    hotColumn = document.createElement('hot-column');
    hotColumn.setAttribute('class', 'custom-class second-class');
    hotColumn.setAttribute('editor', 'false');
    hotColumn.setAttribute('read-only', '');
    hotColumn.setAttribute('read-only-cell-class-name', 'read-only');
    hot.appendChild(hotColumn);
    columns = parser.parseColumn(hot, hotColumn);

    assert.equal(columns.className, 'custom-class second-class');
    assert.isFalse(columns.editor);
    assert.isTrue(columns.readOnly);
    assert.equal(columns.readOnlyCellClassName, 'read-only');
  });

  test('should read table options in correct way', function() {
    var
      parser = new HotTableUtils.SettingsParser(),
      hot;

    hot = createHotTable();
    spyOn(parser, 'readBool').and.callThrough();

    assert.equal(parser.readOption(hot, 'className', ''), '');
    assert.equal(parser.readOption(hot, 'className', 'true', 'true'));
    assert.isTrue(parser.readOption(hot, 'someProperty', ''));
    assert.isTrue(parser.readOption(hot, 'someProperty', 'true'));
    assert.isFalse(parser.readOption(hot, 'someProperty', 'false'));
    assert.isUndefined(parser.readOption(hot, 'someProperty', void 0));
    assert.equal(parser.readBool.calls.count(), 4);

    parser.readOption(hot, 'renderer', 1);
    parser.readOption(hot, 'datarows', 2);
    parser.readOption(hot, 'source', 3);
    parser.readOption(hot, 'dataSchema', 4);
  });

  test('should try to read as boolean if not it returns untouched value', function() {
    var
      parser = new HotTableUtils.SettingsParser();

    assert.isTrue(parser.readBool(''));
    assert.isTrue(parser.readBool('true'));
    assert.equal(parser.readBool('foo'), 'foo');
    assert.isFalse(parser.readBool('false'));
    assert.isNull(parser.readBool(null))
    assert.isUndefined(parser.readBool(void 0));
    assert.equal(parser.readBool(12345), 12345);
  });
});
