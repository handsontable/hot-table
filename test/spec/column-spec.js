describe('<hot-column>', function() {
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

  it('property should return value set by attribute', function() {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    runs(function() {
      expect(hotColumn.header).toBe('My header');
    });
  });

  it('attribute value should be rendered', function() {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(200);

    runs(function() {
      expect(hot.shadowRoot.querySelector('th').textContent).toBe('My header');
    });
  });

  it('changed attribute value should be rendered', function() {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    runs(function() {
      hotColumn.setAttribute('header', 'My another header');
    });

    waits(200);

    runs(function() {
      expect(hot.shadowRoot.querySelector('th').textContent).toBe('My another header');
    });
  });

  it('autocomplete source attribute value should be parsed', function() {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    window.names = ["Fred", "Freddie", "Frederick"];
    hotColumn.setAttribute('type', 'autocomplete');
    hotColumn.setAttribute('source', 'names');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(200);

    runs(function() {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);
    });
  });

  it('dropdown source attribute value should be parsed', function() {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    window.names = ['Fred', 'Freddie', 'Frederick'];
    hotColumn.setAttribute('type', 'dropdown');
    hotColumn.setAttribute('source', 'names');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    waitsFor(function() {
      return ready;
    }, 1000);

    waits(500);

    runs(function() {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);
    });
  });

  it('should be able to pass the autocomplete source object as attribute directly using template bindings', function() {
    var
      names = ['Fred', 'Freddie', 'Frederick'],
      model = {
        data: [
          {name: 'Freddie'}
        ],
        names: names,
        html: '<hot-table datarows="{{ data }}"><hot-column value="name" type="autocomplete" source="{{ names }}"></hot-column></hot-table>'
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

    waits(200);

    runs(function() {
      expect(getHotTable().getCellMeta(0, 0).source).toBe(names);
    });
  });

  it('should be able to pass the dropdown source object as attribute directly using template bindings', function() {
    var
      names = ['Fred', 'Freddie', 'Frederick'],
      model = {
        data: [
          {name: 'Freddie'}
        ],
        names: names,
        html: '<hot-table datarows="{{ data }}"><hot-column value="name" type="dropdown" source="{{ names }}"></hot-column></hot-table>'
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

    waits(200);

    runs(function() {
      expect(getHotTable().getCellMeta(0, 0).source).toBe(names);
      expect(getHotTable().getDataAtCell(0, 0)).toBe('Freddie');
    });
  });

  //
  // Declarative Renderers - Templates
  //
  describe('Renderer (Template)', function() {
    it('should use custom renderer to render cell value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">{{ id }}...({{ row }}:{{ col }})</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1...(0:0)');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2...(1:0)');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3...(2:0)');
      });
    });

    it('should use custom renderer to render cell value when data is array of objects', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name" header="ID">' +
            '<template data-hot-role="renderer">{{ name.first }} {{ name.last }}</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('Joe Fabiano');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('Mike Foo');
      });
    });

    it('shouldn\'t use custom renderer if template has wrong `data-hot-role` attribute value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template>{{ id }}...</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');
      });
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">{{ id }}...</template>' +
            '<template data-hot-role="renderer">{{ id }}!!!</template>' +
            '<template data-hot-role="renderer">{{ id }}???</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1...');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2...');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3...');
      });
    });
  });

  //
  // Declarative Renderers - CustomElement
  //
  describe('Renderer (CustomElement)', function() {
    var work = document.createElement('div');

    Polymer('my-custom-renderer', {
      forceReady: true
    });
    Polymer('my-second-custom-renderer', {
      forceReady: true
    });
    work.innerHTML =
        '<polymer-element name="my-custom-renderer" attributes="value">' +
          '<template>' +
            '<span>{{ value }}!</span>' +
          '</template>' +
        '</polymer-element>' +
        '<polymer-element name="my-second-custom-renderer" attributes="value">' +
          '<template>' +
            '<span>{{ value }}!</span>' +
          '</template>' +
        '</polymer-element>'
      ;

    beforeEach(function() {
      if (!work.parentNode) {
        document.body.appendChild(work);
      }
    });


    it('should use custom renderer to render cell value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">' +
              '<my-custom-renderer value="{{ id }}"></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('1!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('2!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').firstChild.shadowRoot.textContent).toBe('3!');
      });
    });

    it('should use custom renderer to render cell value when data is array of objects', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name" header="NAME">' +
            '<template data-hot-role="renderer">' +
              '<my-custom-renderer value="{{ name.first }} {{ name.last }}"></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('Joe Fabiano!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('Mike Foo!');
      });
    });

    it('shouldn\'t use custom renderer if it hasn\'t got parent node as a template element', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<my-custom-renderer data-hot-role="renderer" value="id"></my-custom-renderer>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');
      });
    });

    it('shouldn\'t use custom renderer if it has wrong `data-hot-role` attribute value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template>' +
              '<my-custom-renderer></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');
      });
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="renderer">' +
              '<my-second-custom-renderer value="{{ id }}..."></my-second-custom-renderer>' +
            '</template>' +
            '<template data-hot-role="renderer">' +
              '<my-custom-renderer value="{{ id }}."></my-custom-renderer>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('1...!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('2...!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').firstChild.shadowRoot.textContent).toBe('3...!');
      });
    });
  });

  //
  // Declarative editors - Template
  //
  describe('Editor (Template)', function() {
    it('should open and close custom editor', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="editor">' +
              '<input type="text" value="{{ id }}">' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(isEditorVisible()).toBe(false);
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        expect(isEditorVisible()).toBe(true);
      });

      runs(function() {
        keyDown('esc');
      });

      runs(function() {
        expect(isEditorVisible()).toBe(false);
      });
    });

    it('should fill editor with edited cell value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="editor">' +
              '<input type="text" value="{{ id }}">' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        expect(getEditorHolder().find('input').val()).toBe('2');
      });
    });

    it('should fill editor with edited cell value when data is array of objects', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name" header="Name">' +
            '<template data-hot-role="editor">' +
              '{{ name.first }} {{ name.last }}' +
              '<input type="text" value="{{ name.first }}">' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        expect(getEditorHolder().text()).toBe('Mike Foo');
        expect(getEditorHolder().find('input').val()).toBe('Mike');
      });
    });

    it('should update cell value after editor is closed', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name.first" header="Name">' +
            '<template data-hot-role="editor">' +
              '<input type="text" value="{{ name.first }}">' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        // Modify value direct in template model instance
        getEditorHolder().find('input')[0].templateInstance_.model.name.first = 'Gorge';
      });

      runs(function() {
        getHotTable().destroyEditor();
      });

      runs(function() {
        expect(getHotTable().getDataAtCell(1, 0)).toBe('Gorge');
      });
    });

    it('shouldn\'t use custom editor if template has wrong `data-hot-role` attribute value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name.first" header="Name">' +
            '<template>' +
              '<input type="text" value="{{ name.first }}">' +
            '</template>' +
            '<template data-hot-role="editorrrr">' +
              '<input type="text" value="{{ name.first }}">' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        // Default build-in text editor
        expect(getEditorHolder().find('textarea.handsontableInput').length).toBe(1);
      });
    });
  });

  //
  // Declarative editors - CustomElement
  //
  describe('Editor (CustomElement)', function() {
    var work = document.createElement('div');

    Polymer('my-custom-editor', {
      forceReady: true
    });
    Polymer('my-second-custom-editor', {
      forceReady: true
    });
    work.innerHTML =
        '<polymer-element name="my-custom-editor" attributes="value">' +
          '<template>' +
            '<input type="text" value="{{ value }}">' +
          '</template>' +
        '</polymer-element>' +
        '<polymer-element name="my-second-custom-editor" attributes="value">' +
          '<template>' +
            'Actual value is: {{ value }}' +
            '<br>' +
            '<input type="text" value="{{ value }}">' +
          '</template>' +
        '</polymer-element>'
      ;

    beforeEach(function() {
      if (!work.parentNode) {
        document.body.appendChild(work);
      }
    });


    it('should open and close custom editor', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="editor">' +
              '<my-custom-editor value="{{ id }}"></my-custom-editor>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(isEditorVisible()).toBe(false);
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        expect(isEditorVisible()).toBe(true);
      });

      runs(function() {
        keyDown('esc');
      });

      runs(function() {
        expect(isEditorVisible()).toBe(false);
      });
    });

    it('should fill editor with edited cell value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<template data-hot-role="editor">' +
              '<my-custom-editor value="{{ id }}"></my-custom-editor>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        expect(getEditorHolder().find('my-custom-editor').val()).toBe(2);
        expect(getEditorHolder().find('my-custom-editor')[0].shadowRoot.querySelector('input').value).toBe('2');
      });
    });

    it('should fill editor with edited cell value when data is array of objects', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name.first" header="Name">' +
            '<template data-hot-role="editor">' +
              '<my-second-custom-editor value="{{ name.first }}"></my-second-custom-editor>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        expect(getEditorHolder().find('my-second-custom-editor')[0].shadowRoot.textContent).toBe('Actual value is: Mike');
        expect(getEditorHolder().find('my-second-custom-editor').val()).toBe('Mike');
      });
    });

    it('shouldn\'t use custom editor if it hasn\'t got parent node as a template element', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
          '<hot-column value="id" header="ID">' +
            '<my-custom-editor data-hot-role="editor" value="{{ id }}"></my-custom-editor>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');
      });
    });

    it('should update cell value after editor is closed', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name.first" header="Name">' +
            '<template data-hot-role="editor">' +
              '<my-second-custom-editor value="{{ name.first }}"></my-second-custom-editor>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        // Modify value direct in template model instance
        getEditorHolder().find('my-second-custom-editor')[0].shadowRoot.querySelector('input').
            templateInstance_.model.value = 'Gorge';
      });

      runs(function() {
        getHotTable().destroyEditor();
      });

      runs(function() {
        expect(getHotTable().getDataAtCell(1, 0)).toBe('Gorge');
      });
    });

    it('shouldn\'t use custom editor if template has wrong `data-hot-role` attribute value', function() {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML =
        '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
          '<hot-column value="name.first" header="Name">' +
            '<template>' +
              '<my-custom-editor value="{{ name.first }}"></my-custom-editor>' +
            '</template>' +
            '<template data-hot-role="editorrrr">' +
              '<my-second-custom-editor value="{{ name.first }}"></my-second-custom-editor>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>';
      this.$container.append(div);

      waitsFor(function() {
        return ready;
      }, 1000);

      waits(200);

      runs(function() {
        getHotTable().selectCell(1, 0);
        keyDown('enter');
      });

      waits(200);

      runs(function() {
        // Default build-in text editor
        expect(getEditorHolder().find('textarea.handsontableInput').length).toBe(1);
      });
    });
  });
});

