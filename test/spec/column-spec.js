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

    runs(function () {
      hotColumn.setAttribute('header', 'My another header');
    });

    runs(function () {
      expect(hot.shadowRoot.querySelector('th').textContent).toBe('My another header');

      hot.parentNode.removeChild(hot);
    });
  });

  it('autocomplete source attribute value should be parsed', function () {
    var hot = document.createElement('hot-table');
    var column = document.createElement('hot-column');

    window.names = ["Fred", "Freddie", "Frederick"];
    column.setAttribute('type', 'autocomplete');
    column.setAttribute('source', 'names');
    hot.appendChild(column);
    document.body.appendChild(hot);

    waitsFor(function () {
      return ready;
    }, 1000);

    runs(function () {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);

      hot.parentNode.removeChild(hot);
    });
  });

  it('dropdown source attribute value should be parsed', function () {
    var hot = document.createElement('hot-table');
    var column = document.createElement('hot-column');

    window.names = ["Fred", "Freddie", "Frederick"];
    column.setAttribute('type', 'dropdown');
    column.setAttribute('source', 'names');
    hot.appendChild(column);
    document.body.appendChild(hot);

    waitsFor(function () {
      return ready;
    }, 1000);

    runs(function () {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);

      hot.parentNode.removeChild(hot);
    });
  });

  it('should be able to pass the autocomplete source object as attribute directly using template bindings', function() {
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

  it('should be able to pass the dropdown source object as attribute directly using template bindings', function () {
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

  describe('Renderer (Template)', function () {
    it('should use custom renderer to render cell value', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">{{ id }}...({{ row }}:{{ col }})</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1...(0:0)');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2...(1:0)');
        expect(hot.shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3...(2:0)');

        hot.parentNode.removeChild(hot);
      });
    });

    it('should use custom renderer to render cell value when data is array of objects', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name" header="ID">' +
            '<template data-hot-role="renderer">{{ name.first }} {{ name.last }}</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('Joe Fabiano');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('Mike Foo');

        hot.parentNode.removeChild(hot);
      });
    });

    it('shouldn\'t use custom renderer if template hasn\'t `data-hot-role`', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template>{{ id }}...</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      waits(0);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(hot.shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');

        hot.parentNode.removeChild(hot);
      });
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">{{ id }}...</template>' +
            '<template data-hot-role="renderer">{{ id }}!!!</template>' +
            '<template data-hot-role="renderer">{{ id }}???</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      waits(0);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1...');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2...');
        expect(hot.shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3...');

        hot.parentNode.removeChild(hot);
      });
    });
  });

  describe('Renderer (CustomElement)', function () {
    var work = document.createElement('div');

    function attributeChanged(attrName, oldVal, newVal) {
      if (attrName === 'value') {
        this.value = newVal;
      }
    }

    Polymer('my-custom-renderer', {
      forceReady: true,
      attributeChanged: attributeChanged
    });
    Polymer('my-second-custom-renderer', {
      forceReady: true,
      attributeChanged: attributeChanged
    });
    work.innerHTML =
        '<polymer-element name="my-custom-renderer">' +
          '<template>' +
            '<span>{{ value }}!</span>' +
          '</template>' +
        '</polymer-element>' +
        '<polymer-element name="my-second-custom-renderer">' +
          '<template>' +
            '<span>{{ value }}!</span>' +
          '</template>' +
        '</polymer-element>'
      ;

    beforeEach(function () {
      if (!work.parentNode) {
        document.body.appendChild(work);
      }
    });


    it('should use custom renderer to render cell value', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">' +
              '<my-custom-renderer value="{{ id }}"></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('1!');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('2!');
        expect(hot.shadowRoot.querySelector('tr:nth-child(3) td').firstChild.shadowRoot.textContent).toBe('3!');

        hot.parentNode.removeChild(hot);
      });
    });

    it('should use custom renderer to render cell value when data is array of objects', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name" header="NAME">' +
            '<template data-hot-role="renderer">' +
              '<my-custom-renderer value="{{ name.first }} {{ name.last }}"></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('Joe Fabiano!');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('Mike Foo!');

        hot.parentNode.removeChild(hot);
      });
    });

    it('shouldn\'t use custom renderer if it hasn\'t parent node as template element', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<my-custom-renderer data-hot-role="renderer" value="id"></my-custom-renderer>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(hot.shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');

        hot.parentNode.removeChild(hot);
      });
    });

    it('shouldn\'t use custom renderer if it hasn\'t `data-hot-role` attribute', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template>' +
              '<my-custom-renderer></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(hot.shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');

        hot.parentNode.removeChild(hot);
      });
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function() {
      var div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table id="hot" datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">' +
              '<my-second-custom-renderer value="{{ id }}..."></my-second-custom-renderer>' +
            '</template>' +
            '<template data-hot-role="renderer">' +
              '<my-custom-renderer value="{{ id }}."></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      document.body.appendChild(div);
      hot = div.querySelector('#hot');

      waitsFor(function () {
        return ready;
      }, 1000);

      waits(0);

      runs(function () {
        expect(hot.shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('1...!');
        expect(hot.shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('2...!');
        expect(hot.shadowRoot.querySelector('tr:nth-child(3) td').firstChild.shadowRoot.textContent).toBe('3...!');

        hot.parentNode.removeChild(hot);
      });
    });
  });
});

