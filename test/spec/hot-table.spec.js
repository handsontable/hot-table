describe('<hot-table>', function () {

  it('should create table', function(done) {
    var
      hot = createHotTable();

    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getCell(0, 0).nodeName).toBe('TD');
      done();
    }, timeout);
  });

  it('should possible to call public handsontable methods', function () {
    var
      hot = createHotTable();

    this.$container.append(hot);

    expect(hot.addHook).toBeFunction();
    expect(hot.addHookOnce).toBeFunction();
    expect(hot.alter).toBeFunction();
    expect(hot.clear).toBeFunction();
    expect(hot.clearUndo).toBeFunction();
    expect(hot.colOffset).toBeFunction();
    expect(hot.colToProp).toBeFunction();
    expect(hot.countCols).toBeFunction();
    expect(hot.countEmptyCols).toBeFunction();
    expect(hot.countEmptyRows).toBeFunction();
    expect(hot.countRenderedCols).toBeFunction();
    expect(hot.countRenderedRows).toBeFunction();
    expect(hot.countRows).toBeFunction();
    expect(hot.countSourceRows).toBeFunction();
    expect(hot.countVisibleCols).toBeFunction();
    expect(hot.countVisibleRows).toBeFunction();
    expect(hot.deselectCell).toBeFunction();
    expect(hot.destroy).toBeFunction();
    expect(hot.destroyEditor).toBeFunction();
    expect(hot.getActiveEditor).toBeFunction();
    expect(hot.getCell).toBeFunction();
    expect(hot.getCellEditor).toBeFunction();
    expect(hot.getCellMeta).toBeFunction();
    expect(hot.getCellRenderer).toBeFunction();
    expect(hot.getCellValidator).toBeFunction();
    expect(hot.getCellsMeta).toBeFunction();
    expect(hot.getColHeader).toBeFunction();
    expect(hot.getColWidth).toBeFunction();
    expect(hot.getCoords).toBeFunction();
    expect(hot.getCopyableData).toBeFunction();
    expect(hot.getCopyableText).toBeFunction();
    expect(hot.getData).toBeFunction();
    expect(hot.getDataAtCell).toBeFunction();
    expect(hot.getDataAtCol).toBeFunction();
    expect(hot.getDataAtProp).toBeFunction();
    expect(hot.getDataAtRow).toBeFunction();
    expect(hot.getDataAtRowProp).toBeFunction();
    expect(hot.getDataType).toBeFunction();
    expect(hot.getInstance).toBeFunction();
    expect(hot.getPlugin).toBeFunction();
    expect(hot.getRowHeader).toBeFunction();
    expect(hot.getRowHeight).toBeFunction();
    expect(hot.getSchema).toBeFunction();
    expect(hot.getSelected).toBeFunction();
    expect(hot.getSelectedRange).toBeFunction();
    expect(hot.getSettings).toBeFunction();
    expect(hot.getSourceData).toBeFunction();
    expect(hot.getSourceDataAtCell).toBeFunction();
    expect(hot.getSourceDataAtCol).toBeFunction();
    expect(hot.getSourceDataAtRow).toBeFunction();
    expect(hot.getValue).toBeFunction();
    expect(hot.hasColHeaders).toBeFunction();
    expect(hot.hasRowHeaders).toBeFunction();
    //expect(hot.init).toBeFunction();
    //expect(hot.isEmptyCol).toBeFunction();
    //expect(hot.isEmptyRow).toBeFunction();
    expect(hot.isListening).toBeFunction();
    expect(hot.isRedoAvailable).toBeFunction();
    expect(hot.isUndoAvailable).toBeFunction();
    expect(hot.listen).toBeFunction();
    expect(hot.loadData).toBeFunction();
    expect(hot.populateFromArray).toBeFunction();
    expect(hot.propToCol).toBeFunction();
    expect(hot.removeCellMeta).toBeFunction();
    expect(hot.removeHook).toBeFunction();
    expect(hot.render).toBeFunction();
    expect(hot.rowOffset).toBeFunction();
    expect(hot.runHooks).toBeFunction();
    expect(hot.selectCell).toBeFunction();
    expect(hot.selectCellByProp).toBeFunction();
    expect(hot.setCellMeta).toBeFunction();
    expect(hot.setCellMetaObject).toBeFunction();
    expect(hot.setDataAtCell).toBeFunction();
    expect(hot.setDataAtRowProp).toBeFunction();
    expect(hot.spliceCol).toBeFunction();
    expect(hot.spliceRow).toBeFunction();
    expect(hot.unlisten).toBeFunction();
    expect(hot.updateSettings).toBeFunction();
    expect(hot.validateCell).toBeFunction();
    expect(hot.validateCells).toBeFunction();
  });

  it('should detect that table is running in hot-table environment', function(done) {
    var
      hot = createHotTable();

    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.hot.isHotTableEnv).toBe(true);
      done();
    }, timeout);
  });

  it('undefined attribute should return default value', function(done) {
    var
      hot = createHotTable();

    this.$container.append(hot);

    setTimeout(function() {
      // value of the property in element should be the same as property in handsontable settings object.
      expect(hot.allowInvalid).toBe(true);
      expect(hot.getSettings().allowInvalid).toBe(true);
      expect(hot.viewportColumnRenderingOffset).toBe('auto');
      expect(hot.getSettings().viewportColumnRenderingOffset).toBe('auto');
      done();
    }, timeout);
  });

  it('attribute should update settings', function(done) {
    var
      hot = createHotTable();

    this.$container.append(hot);
    hot.setAttribute('viewport-column-rendering-offset', '100');

    setTimeout(function() {
      // value of the property in element should be the same as property in handsontable settings object.
      expect(hot.viewportColumnRenderingOffset).toBe('100');
      expect(hot.getSettings().viewportColumnRenderingOffset).toBe('100');
      done();
    }, timeout);
  });

  it('settings attribute value should be parsed', function(done) {
    var
      hot = createHotTable();

    hot.setAttribute('settings', '{"minSpareRows":3}');
    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getSettings().minSpareRows).toBe(3);
      done();
    }, timeout);
  });

  it('should be able to pass the data object as attribute directly using template bindings', function(done) {
    var
      model = {
        data: [{
          name: "Freddie"
        }],
      },
      tpl, domBind;

    this.$container.append(
      createHtml('<hot-table id="hot" datarows="{{ data }}"><hot-column value="name"></hot-column></hot-table>', model)
    );

    setTimeout(function() {
      expect(getHotTable().getData()).toEqual([[model.data[0].name]]);
      expect(getHotTable().getSourceData()).toBe(model.data);
      done();
    }, timeout);
  });

  it('should be able to pass the settings object as attribute directly using template bindings', function(done) {
    var
      model = {
        settings: {
          colHeaders: ["First Name"]
        },
      },
      tpl, domBind;

    this.$container.append(
      createHtml('<hot-table id="hot" settings="{{ settings }}"><hot-column value="name"></hot-column></hot-table>', model)
    );

    setTimeout(function() {
      expect(getHotTable().getColHeader(0)).toBe('First Name');
      done();
    }, timeout);
  });

  it('should parse empty property as boolean true', function(done) {
    var
      model = {},
      tpl, domBind;

    this.$container.append(
      createHtml('<hot-table id="hot" col-headers></hot-table>', model)
    );

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(true);
      done();
    }, timeout);
  });

  it('should parse string "true" as boolean true', function(done) {
    var
      model = {},
      tpl, domBind;

    this.$container.append(
      createHtml('<hot-table id="hot" col-headers="true"></hot-table>', model)
    );

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(true);
      done();
    }, timeout);
  });

  it('should parse string "false" as boolean false', function(done) {
    var
      model = {},
      tpl, domBind;

    this.$container.append(
      createHtml('<hot-table id="hot" col-headers="false"></hot-table>', model)
    );

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(false);
      done();
    }, timeout);
  });

  it('should parse function', function(done) {
    var
      model = {
        fn: myFunction,
      },
      tpl, domBind;

    function myFunction(col) {
      return col;
    }

    this.$container.append(
      createHtml('<hot-table id="hot" col-headers="{{fn}}"></hot-table>', model)
    );

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(myFunction);
      done();
    }, timeout);
  });

  it('should parse empty class as string (not boolean)', function() {
    var
      hot = createHotTable();

    this.$container.append(hot);

    expect(Handsontable.dom.polymerWrap(getHotTable()).className).toBe('');
  });

  it('should parse class attribute and apply to table', function(done) {
    var
      hot = createHotTable();

    this.$container.append(hot);
    hot.classList.add('my-table');

    setTimeout(function() {
      expect(getHotTable().classList.contains('my-table')).toBe(true);
      done();
    }, timeout);
  });

  it('should observe Polymer notifications in data', function(done) {
    var
      afterRender = jasmine.createSpy('afterRender'),
      model = {
        settings: {
          afterRender: afterRender
        },
        data: [{
          name: "Freddie"
        }],
      },
      lastCount, tpl, domBind;

    this.$container.append(
      createHtml('<hot-table id="hot" datarows="{{ data }}" settings="{{ settings }}"><hot-column value="name"></hot-column></hot-table>', model)
    );

    lastCount = afterRender.calls.count();
    getHotTable().set("datarows.0.name", "Frederik");

    setTimeout(function() {
      expect(afterRender.calls.count()).toBeGreaterThan(lastCount);
      expect((getHotTable().shadowRoot || getHotTable()).querySelector('td').textContent).toBe('Frederik');
      done();
    }, timeout);
  });

  it('should replace the dataset when assigned as a property', function(done) {
    var
      afterRender = jasmine.createSpy('afterRender'),
      model = {
        settings: {
          afterRender: afterRender
        },
        data: [{
          name: "Freddie"
        }],
      },
      lastCount, tpl, domBind;

    this.$container.append(
      createHtml('<hot-table id="hot" datarows="{{ data }}" settings="{{ settings }}"><hot-column value="name"></hot-column></hot-table>', model)
    );

    lastCount = afterRender.calls.count();
    getHotTable().datarows = [{
      name: "Mercury"
    }]

    setTimeout(function() {
      expect(afterRender.calls.count()).toBeGreaterThan(lastCount);
      expect((getHotTable().shadowRoot || getHotTable()).querySelector('td').textContent).toBe('Mercury');
      done();
    }, timeout);
  });
});
