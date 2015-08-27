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
      expect(hot.hotRootElement.querySelector('th').textContent).toBe('My header');
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
      expect(hot.hotRootElement.querySelector('th').textContent).toBe('My another header');
      done();
    }, timeout);
  });

  it('autocomplete source attribute value should be parsed', function(done) {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('type', 'autocomplete');
    hotColumn.setAttribute('source', '["Fred","Freddie","Frederick"]');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getCellMeta(0, 0).source).toEqual(["Fred", "Freddie", "Frederick"]);
      done();
    }, timeout);
  });

  it('dropdown source attribute value should be parsed', function(done) {
    var
      hot = document.createElement('hot-table'),
      hotColumn = document.createElement('hot-column');

    hotColumn.setAttribute('type', 'dropdown');
    hotColumn.setAttribute('source', '["Fred","Freddie","Frederick"]');
    hot.appendChild(hotColumn);
    this.$container.append(hot);

    setTimeout(function() {
      expect(hot.getCellMeta(0, 0).source).toEqual(["Fred","Freddie","Frederick"]);
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

    tpl = document.createElement('template', 'dom-bind');
    tpl.innerHTML = model.html;
    tpl.data = model.data;
    tpl.names = names;
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

    tpl = document.createElement('template', 'dom-bind');
    tpl.innerHTML = model.html;
    tpl.data = model.data;
    tpl.names = names;
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

      div.innerHTML = '<hot-table datarows=\'[{"id":1},{"id":2},{"id":3}]\'>' +
                        '<hot-column value="id" header="ID">' +
                          '<template data-hot-role="renderer" is="dom-template">' +
                            '<span>{{ value }}</span>...(<span>{{ row }}</span>:<span>{{ col }}</span>)' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').textContent).toBe('1...(0:0)');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').textContent).toBe('2...(1:0)');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(3) td').textContent).toBe('3...(2:0)');
        done();
      }, timeout);
    });

    it('should use custom renderer to render cell value when data is array of objects', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"name":{"first":"Joe","last":"Fabiano"}},{"name":{"first":"Mike","last":"Foo"}}]\'>' +
                        '<hot-column value="name" header="ID">' +
                          '<template data-hot-role="renderer" is="dom-template">' +
                            '<span>{{ value.first }}</span> <span>{{ value.last }}</span>'
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').textContent).toBe('Joe Fabiano');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').textContent).toBe('Mike Foo');
        done();
      }, timeout);
    });

    it('shouldn\'t use custom renderer if template has wrong `data-hot-role` attribute value', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"id":1},{"id":2},{"id":3}]\'>' +
                        '<hot-column value="id" header="ID">' +
                          '<template is="dom-template"><span>{{ value }}</span>...</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(3) td').textContent).toBe('3');
        done();
      }, timeout);
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"id":1},{"id":2},{"id":3}]\'>' +
                        '<hot-column value="id" header="ID">' +
                          '<template data-hot-role="renderer" is="dom-template"><span>{{ value }}</span>...</template>' +
                          '<template data-hot-role="renderer" is="dom-template"><span>{{ value }}</span>!!!</template>' +
                          '<template data-hot-role="renderer" is="dom-template"><span>{{ value }}</span>???</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').textContent).toBe('1...');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').textContent).toBe('2...');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(3) td').textContent).toBe('3...');
        done();
      }, timeout);
    });
  });

  //
  // Declarative Renderers - CustomElement
  //
  describe('Renderer (CustomElement)', function() {
    it('should use custom renderer to render cell value', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"id":1},{"id":2},{"id":3}]\'>' +
                        '<hot-column value="id" header="ID">' +
                          '<template data-hot-role="renderer" is="dom-template">' +
                            '<my-custom-renderer value="{{ value }}"></my-custom-renderer>' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').firstChild.textContent).toBe('1!');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').firstChild.textContent).toBe('2!');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(3) td').firstChild.textContent).toBe('3!');
        done();
      }, timeout);
    });

    it('should use custom renderer to render cell value when data is array of objects', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"name":{"first":"Joe","last":"Fabiano"}},{"name":{"first":"Mike","last":"Foo"}}]\'>' +
                        '<hot-column value="name" header="NAME">' +
                          '<template data-hot-role="renderer" is="dom-template">' +
                            '<my-custom-renderer value="{{ value.first }}"></my-custom-renderer>' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').firstChild.textContent).toBe('Joe!');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').firstChild.textContent).toBe('Mike!');
        done();
      }, timeout);
    });

    it('shouldn\'t use custom renderer if it hasn\'t got parent node as a template element', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"id":1},{"id":2},{"id":3}]\'>' +
                        '<hot-column value="id" header="ID">' +
                          '<my-custom-renderer data-hot-role="renderer" value="id"></my-custom-renderer>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(3) td').textContent).toBe('3');
        done();
      }, timeout);
    });

    it('shouldn\'t use custom renderer if it has wrong `data-hot-role` attribute value', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"id":1},{"id":2},{"id":3}]\'>' +
                        '<hot-column value="id" header="ID">' +
                          '<template>' +
                            '<my-custom-renderer></my-custom-renderer>' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').textContent).toBe('1');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').textContent).toBe('2');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(3) td').textContent).toBe('3');
        done();
      }, timeout);
    });

    it('should use the first custom renderer even when hot-column has more than 1 custom renderers', function(done) {
      var
        div = document.createElement('div'),
        hot;

      div.innerHTML = '<hot-table datarows=\'[{"id":1},{"id":2},{"id":3}]\'>' +
                        '<hot-column value="id" header="ID">' +
                          '<template data-hot-role="renderer" is="dom-template">' +
                            '<my-second-custom-renderer value="{{ value }}"></my-second-custom-renderer>' +
                          '</template>' +
                          '<template data-hot-role="renderer" is="dom-template">' +
                            '<my-custom-renderer value="{{ value }}"></my-custom-renderer>' +
                          '</template>' +
                        '</hot-column>' +
                      '</hot-table>';
      this.$container.append(div);

      setTimeout(function() {
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(1) td').firstChild.textContent).toBe('1?');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(2) td').firstChild.textContent).toBe('2?');
        expect(getHotTable().hotRootElement.querySelector('tr:nth-child(3) td').firstChild.textContent).toBe('3?');
        done();
      }, timeout);
    });
  });
});
