describe('<hot-table>', function() {
  var ready = false;

  document.addEventListener('WebComponentsReady', function() {
    ready = true;
  });

  beforeEach(function() {
    this.$container = $('<div id="test-container"></div>').appendTo('body');
  });

  afterEach(function() {
    if (this.$container) {
      this.$container.remove();
    }
  });

  it('should create table', function() {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    runs(function() {
      expect(hot.getCell(0, 0).nodeName).toBe('TD');
    });
  });

  it('undefined attribute should return default value', function() {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(200);

    runs(function() {
      expect(hot.getSettings().pasteMode).toBe('overwrite');
      expect(hot.pasteMode).toBe('overwrite');
    });
  });

  it('attribute should update settings', function() {
    var
      hot = document.createElement('hot-table');

    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    hot.setAttribute('pasteMode', 'shift_down');

    runs(function() {
      // unfortunately must be async because Changed callback is async in Polymer
      expect(hot.pasteMode).toBe('shift_down');
      expect(hot.getSettings().pasteMode).toBe('shift_down');
    });
  });

  it('settings attribute value should be parsed', function() {
    var
      hot = document.createElement('hot-table');

    window.mySettings = {
      minSpareRows: 3
    };
    // same notation is used in
    hot.setAttribute('settings', 'mySettings');
    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    runs(function() {
      expect(hot.getSettings().minSpareRows).toBe(3);
    });
  });

  it('should be able to pass the data object as attribute directly using template bindings', function() {
    var
      model = {
        data: [
          {name: "Freddie"}
        ],
        html: '<hot-table id="hot" datarows="{{ data }}"><hot-column value="name"></hot-column></hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    runs(function() {
      expect(getHotTable().getData()).toBe(model.data);
    });
  });

  it('should be able to pass the settings object as attribute directly using template bindings', function() {
    var
      model = {
        settings: {colHeaders: ["First Name"]},
        html: '<hot-table id="hot" settings="{{ settings }}"><hot-column value="name"></hot-column></hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    runs(function() {
      expect(getHotTable().getColHeader(0)).toBe('First Name');
    });
  });

  it('should parse empty property as boolean true', function() {
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

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    runs(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(true);
    });
  });

  it('should parse string "true" as boolean true', function() {
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

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    runs(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(true);
    });
  });

  it('should parse string "false" as boolean false', function() {
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

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    runs(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(false);
    });
  });

  it('should parse function', function() {
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

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(100);

    runs(function() {
      expect(getHotTable().getSettings().colHeaders).toBe(myFunction);
    });
  });

  it('should observe changes in data', function() {
    var
      afterRender = jasmine.createSpy('afterRender'),
      model = {
        settings: {
          afterRender: afterRender
        },
        data: [
          {name: "Freddie"}
        ],
        html: '<hot-table id="hot" datarows="{{ data }}" settings="{{ settings }}"><hot-column value="name"></hot-column></hot-table>'
      },
      lastCount, tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    waitsFor(function() {
      return ready;
    }, 1000);

    runs(function() {
      lastCount = afterRender.callCount;
      model.data[0].Name = "Frederik";
    });

    waits(100);

    runs(function() {
      expect(afterRender.callCount).toBeGreaterThan(lastCount);
    });
  });

});

