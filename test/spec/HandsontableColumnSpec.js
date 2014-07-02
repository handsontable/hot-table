describe('<hot-column>', function () {
  var ready = false;

  document.addEventListener('WebComponentsReady', function () {
    ready = true;
  });

  it('property should return value set by attribute', function () {
    var hot = document.createElement('hot-table');
    var hotColumn = document.createElement('hot-column');
    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    document.body.appendChild(hot);

    waitsFor(function () {
      return ready;
    }, 1000);

    waits(0);

    runs(function () {
      expect(hotColumn.header).toBe('My header');
      hot.parentNode.removeChild(hot);
    });
  });

  it('attribute value should be rendered', function () {
    var hot = document.createElement('hot-table');
    var hotColumn = document.createElement('hot-column');
    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    document.body.appendChild(hot);

    waitsFor(function () {
      return ready;
    }, 1000);

    waits(0);

    runs(function () {
      expect(hot.shadowRoot.querySelector('th').textContent).toBe('My header');
      hot.parentNode.removeChild(hot);
    });
  });

  it('changed attribute value should be rendered', function () {
    var hot = document.createElement('hot-table');
    var hotColumn = document.createElement('hot-column');
    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    document.body.appendChild(hot);

    waitsFor(function () {
      return ready;
    }, 1000);

    waits(0);

    runs(function () {
      hotColumn.setAttribute('header', 'My another header');
    });

    waits(0);

    runs(function () {
      expect(hot.shadowRoot.querySelector('th').textContent).toBe('My another header');
      hot.parentNode.removeChild(hot);
    });
  });

  it('autocomplete source attribute value should be parsed', function () {
    window.names = ["Fred", "Freddie", "Frederick"];
    var hot = document.createElement('hot-table');
    var column = document.createElement('hot-column');
    column.setAttribute('type', 'autocomplete');
    column.setAttribute('source', 'names');
    hot.appendChild(column);
    document.body.appendChild(hot);

    waitsFor(function () {
      return ready;
    }, 1000);

    waits(100);

    runs(function () {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);
      hot.parentNode.removeChild(hot);
    });
  });

  it('dropdown source attribute value should be parsed', function () {
    window.names = ["Fred", "Freddie", "Frederick"];
    var hot = document.createElement('hot-table');
    var column = document.createElement('hot-column');
    column.setAttribute('type', 'dropdown');
    column.setAttribute('source', 'names');
    hot.appendChild(column);
    document.body.appendChild(hot);

    waitsFor(function () {
      return ready;
    }, 1000);

    waits(100);

    runs(function () {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);
      hot.parentNode.removeChild(hot);
    });
  });

  it('Polymer should be able to pass the autocomplete source object as attribute directly using template bindings', function () {
    var names = ["Fred", "Freddie", "Frederick"];
    var model = {
      data: [
        {name: "Freddie"}
      ],
      names: names,
      html: '<hot-table id="hot" datarows="{{ data }}"><hot-column value="name" type="autocomplete" source="{{ names }}"></hot-column></hot-table>'
    };

    var tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.templateBinding = new PolymerExpressions();
    tpl.innerHTML = model.html;
    tpl.model = model;
    document.body.appendChild(tpl);

    waitsFor(function () {
      return ready;
    }, 1000);

    waits(100);

    runs(function () {
      var hot = document.getElementById('hot');
      expect(hot.getCellMeta(0, 0).source).toBe(names);
      hot.parentNode.removeChild(hot);
    });
  });

  it('Polymer should be able to pass the dropdown source object as attribute directly using template bindings', function () {
    var names = ["Fred", "Freddie", "Frederick"];
    var model = {
      data: [
        {name: "Freddie"}
      ],
      names: names,
      html: '<hot-table id="hot" datarows="{{ data }}"><hot-column value="name" type="dropdown" source="{{ names }}"></hot-column></hot-table>'
    };

    var tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.templateBinding = new PolymerExpressions();
    tpl.innerHTML = model.html;
    tpl.model = model;
    document.body.appendChild(tpl);

    waitsFor(function () {
      return ready;
    }, 1000);

    waits(100);

    runs(function () {
      var hot = document.getElementById('hot');
      expect(hot.getCellMeta(0, 0).source).toBe(names);
      expect(hot.getDataAtCell(0, 0)).toBe('Freddie');
      hot.parentNode.removeChild(hot);
    });
  });

});

