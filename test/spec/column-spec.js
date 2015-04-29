describe('<hot-column>', function() {

  it('property should return value set by attribute', function(done) {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    setTimeout(function() {
      expect(hotColumn.header).toBe('My header');
      done();
    }, timeout);
  });

  it('attribute value should be rendered', function(done) {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.shadowRoot.querySelector('th').textContent).toBe('My header');
      done();
    }, timeout);
  });

  it('changed attribute value should be rendered', function(done) {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('header', 'My header');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    hotColumn.setAttribute('header', 'My another header');

    setTimeout(function() {
      expect(hot.shadowRoot.querySelector('th').textContent).toBe('My another header');
      done();
    }, timeout);
  });

  it('autocomplete source attribute value should be parsed', function(done) {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    window.names = ["Fred", "Freddie", "Frederick"];
    hotColumn.setAttribute('type', 'autocomplete');
    hotColumn.setAttribute('source', 'names');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);
      done();
    }, timeout);
  });

  it('dropdown source attribute value should be parsed', function(done) {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    window.names = ['Fred', 'Freddie', 'Frederick'];
    hotColumn.setAttribute('type', 'dropdown');
    hotColumn.setAttribute('source', 'names');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getCellMeta(0, 0).source).toBe(window.names);
      done();
    }, timeout);
  });

  it('should be able to pass the autocomplete source object as attribute directly using template bindings', function(done) {
    var
      names = ['Fred', 'Freddie', 'Frederick'],
      model = {
        data: [{
          name: 'Freddie'
        }],
        names: names,
        html: '<hot-table datarows="{{ data }}">' +
                '<hot-column value="name" type="autocomplete" source="{{ names }}"></hot-column>' +
              '</hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getCellMeta(0, 0).source).toBe(names);
      done();
    }, timeout);
  });

  it('should be able to pass the dropdown source object as attribute directly using template bindings', function(done) {
    var
      names = ['Fred', 'Freddie', 'Frederick'],
      model = {
        data: [{
          name: 'Freddie'
        }],
        names: names,
        html: '<hot-table datarows="{{ data }}">' +
                '<hot-column value="name" type="dropdown" source="{{ names }}"></hot-column>' +
              '</hot-table>'
      },
      tpl;

    tpl = document.createElement('template');
    tpl.setAttribute('bind', '');
    tpl.innerHTML = model.html;
    tpl.model = model;
    this.$container.append(tpl);

    setTimeout(function() {
      expect(getHotTable().getCellMeta(0, 0).source).toBe(names);
      expect(getHotTable().getDataAtCell(0, 0)).toBe('Freddie');
      done();
    }, timeout);
  });

  //
  // Declarative Renderers - Templates
  //
  describe('Renderer (Template)', function() {
    it('should use custom renderer to render cell value', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
                        '<hot-column value="id" header="ID">' +
                          '<template data-hot-role="renderer">{{ id }}...({{ row }}:{{ col }})</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1...(0:0)');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2...(1:0)');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3...(2:0)');
        done();
      }, timeout);
    });

    it('should use custom renderer to render cell value when data is array of objects', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
                        '<hot-column value="name" header="ID">' +
                          '<template data-hot-role="renderer">{{ name.first }} {{ name.last }}</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('Joe Fabiano');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('Mike Foo');
        done();
      }, timeout);
    });

    it('shouldn\'t use custom renderer if template has wrong `data-hot-role` attribute value', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
                        '<hot-column value="id" header="ID">' +
                          '<template>{{ id }}...</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');
        done();
      }, timeout);
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
                        '<hot-column value="id" header="ID">' +
                          '<template data-hot-role="renderer">{{ id }}...</template>' +
                          '<template data-hot-role="renderer">{{ id }}!!!</template>' +
                          '<template data-hot-role="renderer">{{ id }}???</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1...');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2...');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3...');
        done();
      }, timeout);
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
    work.innerHTML = '<polymer-element name="my-custom-renderer" attributes="value">' +
                        '<template>' +
                          '<span>{{ value }}!</span>' +
                        '</template>' +
                      '</polymer-element>' +
                      '<polymer-element name="my-second-custom-renderer" attributes="value">' +
                        '<template>' +
                          '<span>{{ value }}!</span>' +
                        '</template>' +
                      '</polymer-element>';

    beforeEach(function() {
      if (!work.parentNode) {
        document.body.appendChild(work);
      }
    });


    it('should use custom renderer to render cell value', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
                        '<hot-column value="id" header="ID">' +
                          '<template data-hot-role="renderer">' +
                            '<my-custom-renderer value="{{ id }}"></my-custom-renderer>' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('1!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('2!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').firstChild.shadowRoot.textContent).toBe('3!');
        done();
      }, timeout);
    });

    it('should use custom renderer to render cell value when data is array of objects', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{name: {first: \'Joe\', last: \'Fabiano\'}},{name: {first: \'Mike\', last: \'Foo\'}}]">' +
                        '<hot-column value="name" header="NAME">' +
                          '<template data-hot-role="renderer">' +
                            '<my-custom-renderer value="{{ name.first }} {{ name.last }}"></my-custom-renderer>' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('Joe Fabiano!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('Mike Foo!');
        done();
      }, timeout);
    });

    it('shouldn\'t use custom renderer if it hasn\'t got parent node as a template element', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
                        '<hot-column value="id" header="ID">' +
                          '<my-custom-renderer data-hot-role="renderer" value="id"></my-custom-renderer>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');
        done();
      }, timeout);
    });

    it('shouldn\'t use custom renderer if it has wrong `data-hot-role` attribute value', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
                        '<hot-column value="id" header="ID">' +
                          '<template>' +
                            '<my-custom-renderer></my-custom-renderer>' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').textContent).toBe('3');
        done();
      }, timeout);
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows="[{id: 1},{id: 2},{id: 3}]">' +
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

      setTimeout(function() {
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(1) td').firstChild.shadowRoot.textContent).toBe('1...!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(2) td').firstChild.shadowRoot.textContent).toBe('2...!');
        expect(getHotTable().shadowRoot.querySelector('tr:nth-child(3) td').firstChild.shadowRoot.textContent).toBe('3...!');
        done();
      }, timeout);
    });
  });
});
