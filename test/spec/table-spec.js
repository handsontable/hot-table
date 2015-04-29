
describe('<hot-table>', function () {

  it('should create table', function(done) {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getCell(0, 0).nodeName).toBe('TD');
      done();
    }, timeout);
  });

  it('should possible to call public handsontable methods', function () {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    expect(hot.addHook).isFunction();
    expect(hot.addHookOnce).isFunction();
    expect(hot.alter).isFunction();
    expect(hot.clear).isFunction();
    expect(hot.clearUndo).isFunction();
    expect(hot.colOffset).isFunction();
    expect(hot.colToProp).isFunction();
    expect(hot.countCols).isFunction();
    expect(hot.countEmptyCols).isFunction();
    expect(hot.countEmptyRows).isFunction();
    expect(hot.countRenderedCols).isFunction();
    expect(hot.countRenderedRows).isFunction();
    expect(hot.countRows).isFunction();
    expect(hot.countVisibleCols).isFunction();
    expect(hot.countVisibleRows).isFunction();
    expect(hot.deselectCell).isFunction();
    expect(hot.destroy).isFunction();
    expect(hot.destroyEditor).isFunction();
    expect(hot.determineColumnWidth).isFunction();
    expect(hot.getCell).isFunction();
    expect(hot.getCellEditor).isFunction();
    expect(hot.getCellMeta).isFunction();
    expect(hot.getCellRenderer).isFunction();
    expect(hot.getCellValidator).isFunction();
    expect(hot.getColHeader).isFunction();
    expect(hot.getColWidth).isFunction();
    expect(hot.getCopyableData).isFunction();
    expect(hot.getData).isFunction();
    expect(hot.getDataAtCell).isFunction();
    expect(hot.getDataAtCol).isFunction();
    expect(hot.getDataAtProp).isFunction();
    expect(hot.getDataAtRow).isFunction();
    expect(hot.getDataAtRowProp).isFunction();
    expect(hot.getInstance).isFunction();
    expect(hot.getRowHeader).isFunction();
    expect(hot.getRowHeight).isFunction();
    expect(hot.getSchema).isFunction();
    expect(hot.getSelected).isFunction();
    expect(hot.getSelectedRange).isFunction();
    expect(hot.getSettings).isFunction();
    expect(hot.getSourceDataAtCol).isFunction();
    expect(hot.getSourceDataAtRow).isFunction();
    expect(hot.getValue).isFunction();
    expect(hot.hasColHeaders).isFunction();
    expect(hot.hasRowHeaders).isFunction();
    expect(hot.init).isFunction();
    expect(hot.isEmptyCol).isFunction();
    expect(hot.isEmptyRow).isFunction();
    expect(hot.isListening).isFunction();
    expect(hot.isRedoAvailable).isFunction();
    expect(hot.isUndoAvailable).isFunction();
    expect(hot.listen).isFunction();
    expect(hot.loadData).isFunction();
    expect(hot.populateFromArray).isFunction();
    expect(hot.propToCol).isFunction();
    expect(hot.removeCellMeta).isFunction();
    expect(hot.removeHook).isFunction();
    expect(hot.render).isFunction();
    expect(hot.rowOffset).isFunction();
    expect(hot.runHooks).isFunction();
    expect(hot.selectCell).isFunction();
    expect(hot.selectCellByProp).isFunction();
    expect(hot.setCellMeta).isFunction();
    expect(hot.setCellMetaObject).isFunction();
    expect(hot.setDataAtCell).isFunction();
    expect(hot.setDataAtRowProp).isFunction();
    expect(hot.spliceCol).isFunction();
    expect(hot.spliceRow).isFunction();
    expect(hot.undo).isFunction();
    expect(hot.unlisten).isFunction();
    expect(hot.updateSettings).isFunction();
    expect(hot.validateCell).isFunction();
    expect(hot.validateCells).isFunction();
  });

  it('should detect that table is running in hot-table environment', function(done) {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.instance.isHotTableEnv).toBe(true);
      done();
    }, timeout);
  });

  it('undefined attribute should return default value', function(done) {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getSettings().pasteMode).toBe('overwrite');
      expect(hot.pasteMode).toBe('overwrite');
      done();
    }, timeout);
  });

  it('attribute should update settings', function(done) {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);
    hot.setAttribute('pasteMode', 'shift_down');

    setTimeout(function() {
      expect(hot.pasteMode).toBe('shift_down');
      expect(hot.getSettings().pasteMode).toBe('shift_down');
      done();
    }, timeout);
  });

  it('settings attribute value should be parsed', function(done) {
    var
      hot = document.createElement('hot-table');

    window.mySettings = {
      minSpareRows: 3
    };
    // same notation is used in
    hot.setAttribute('settings', 'mySettings');
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
        html: '<hot-table id="hot" datarows="{{ data }}"><hot-column value="name"></hot-column></hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getData()).toBe(model.data);
      done();
    }, timeout);
  });

  it('should be able to pass the settings object as attribute directly using template bindings', function(done) {
    var
      model = {
        settings: {
          colHeaders: ["First Name"]
        },
        html: '<hot-table id="hot" settings="{{ settings }}"><hot-column value="name"></hot-column></hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getColHeader(0)).toBe('First Name');
      done();
    }, timeout);
  });

  it('should parse empty property as boolean true', function(done) {
    var
      model = {
        html: '<hot-table id="hot" colHeaders></hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(true);
      done();
    }, timeout);
  });

  it('should parse string "true" as boolean true', function(done) {
    var
      model = {
        html: '<hot-table id="hot" colHeaders="true"></hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(true);
      done();
    }, timeout);
  });

  it('should parse string "false" as boolean false', function(done) {
    var
      model = {
        html: '<hot-table id="hot" colHeaders="false"></hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(false);
      done();
    }, timeout);
  });

  it('should parse function', function(done) {
    var
      model = {
        fn: myFunction,
        html: '<hot-table id="hot" colHeaders="{{fn}}"></hot-table>'
      },
      tpl;

    function myFunction(col) {
      return col;
    }

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(myFunction);
      done();
    }, timeout);
  });

  it('should parse empty class as string (not boolean)', function() {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    expect(unwrap(getHotTable()).className).toBe('');
  });

  it('should parse class attribute and apply to table', function(done) {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);
    hot.classList.add('my-table');

    setTimeout(function() {
      expect(unwrap(getHotTable()).className).toBe('my-table');
      done();
    }, timeout);
  });

  it('should observe changes in data', function(done) {
    var
      afterRender = jasmine.createSpy('afterRender'),
      model = {
        settings: {
          afterRender: afterRender
        },
        data: [{
          name: "Freddie"
        }],
        html: '<hot-table id="hot" datarows="{{ data }}" settings="{{ settings }}"><hot-column value="name"></hot-column></hot-table>'
      },
      lastCount, tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    lastCount = afterRender.calls.count();
    model.data[0].Name = "Frederik";

    setTimeout(function() {
      expect(afterRender.calls.count()).toBeGreaterThan(lastCount);
      done();
    }, timeout);
  });

});
