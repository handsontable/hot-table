describe('Nested <hot-table>\'s', function() {
  var
    template =
      '<template is="auto-binding">' +
        // hot-table 1
        '<hot-table dataRows="{{ nestedData }}">' +
          '<hot-column value="name" header="Name">' +
            '<template data-hot-role="renderer">{{ name.first }} {{ name.last }}</template>' +
          '</hot-column>' +
          '<hot-column value="company" header="Company" editor="false">' +
            '<template data-hot-role="renderer">' +
              // hot-table 2
              '<hot-table dataRows="{{ company }}">' +
                '<hot-column value="name" header="Name"></hot-column>' +
                '<hot-column value="partners" header="Partners" editor="false">' +
                  '<template data-hot-role="renderer">' +
                    // hot-table 3
                    '<hot-table dataRows="{{ partners }}">' +
                      '<hot-column value="since" header="Since"></hot-column>' +
                      '<hot-column value="name" header="Name"></hot-column>' +
                    '</hot-table>' +
                  '</template>' +
                '</hot-column>' +
              '</hot-table>' +
            '</template>' +
          '</hot-column>' +
        '</hot-table>' +
      '</template>';

  function nestedData() {
      return [
        {
          name: {first: 'Joe', last: 'Fabiano'},
          company: [
            {
              name: 'ABC Company',
              partners: [
                {since: 1990, name: 'B Company'},
                {since: 1998, name: 'C Company'}
              ]
            }
          ]
        },
        {
          name: {first: 'Mike', last: 'Foo'},
          company: [
            {
              name: 'Z12 Ltd.',
              partners: []
            }
          ]
        }
      ];
  }

  it('should create table in table', function(done) {
    var
      div = document.createElement('div'),
      data = nestedData(),
      hot;

    div.innerHTML = template;
    div.querySelector('template').nestedData = data;

    this.$container.append(div);

    setTimeout(function() {
      var hot1, hot2, hot3, hot4;

      hot = div.querySelector('hot-table');
      hot1 = hot.getCell(0, 1).querySelector('hot-table');
      hot2 = hot1.getCell(0, 1).querySelector('hot-table');
      hot3 = hot.getCell(1, 1).querySelector('hot-table');
      hot4 = hot3.getCell(0, 1).querySelector('hot-table');

      expect(hot.getCell(0, 0).nodeName).toBe('TD');
      expect(hot.getCell(0, 0).innerHTML).toBe('Joe Fabiano');

      expect(hot1.getCell(0, 0).nodeName).toBe('TD');
      expect(hot1.getCell(0, 0).innerHTML).toBe('ABC Company');

      expect(hot2.getCell(0, 0).nodeName).toBe('TD');
      expect(hot2.getCell(0, 0).innerHTML).toBe('1990');

      expect(hot3.getCell(0, 0).nodeName).toBe('TD');
      expect(hot3.getCell(0, 0).innerHTML).toBe('Z12 Ltd.');

      expect(hot4.getCell(0, 0)).toBe(undefined);
      done();
    }, timeout);
  });

  describe('Keyboard navigation', function() {
    it('should be possible to select cell of sibling or parent table by an arrow keys navigation (arrow left)', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData(),
        hot;

      div.innerHTML = template;
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1, hot2, hot3, hot4;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 1).querySelector('hot-table');
        hot2 = hot1.getCell(0, 1).querySelector('hot-table');
        hot3 = hot.getCell(1, 1).querySelector('hot-table');
        hot4 = hot3.getCell(0, 1).querySelector('hot-table');


        $(hot2.getCell(0, 0)).simulate('mousedown').simulate('mouseup');
        //$(hot2.getCell(0, 0)).simulate('mousedown');

        // select hot-table #3
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).not.toBe(null);

        keyDown('arrow_left');

        // select hot-table #2
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot1.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);

        keyDown('arrow_left');

        // select hot-table #1 (root)
        expect(hot.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot1.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);
        done();
      }, timeout);
    });

    it('should be possible to select cell of sibling or parent table by an arrow keys navigation (arrow right)', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData(),
        hot;

      div.innerHTML = template;
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1, hot2, hot3, hot4;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 1).querySelector('hot-table');
        hot2 = hot1.getCell(0, 1).querySelector('hot-table');
        hot3 = hot.getCell(1, 1).querySelector('hot-table');
        hot4 = hot3.getCell(0, 1).querySelector('hot-table');

        $(hot2.getCell(0, 0)).simulate('mousedown').simulate('mouseup');

        // select hot-table #3
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).not.toBe(null);

        keyDown('arrow_right');

        // select hot-table #3
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot2.instance.view.wt.selections.current.cellRange).not.toBe(null);

        keyDown('arrow_right');

        // select hot-table #2
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot2.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);

        keyDown('arrow_right');

        // select hot-table #1 (root)
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);
        done();
      }, timeout);
    });

    it('should be possible to select cell of sibling or parent table by an arrow keys navigation (arrow down)', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData(),
        hot;

      div.innerHTML = template;
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1, hot2, hot3, hot4;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 1).querySelector('hot-table');
        hot2 = hot1.getCell(0, 1).querySelector('hot-table');
        hot3 = hot.getCell(1, 1).querySelector('hot-table');
        hot4 = hot3.getCell(0, 1).querySelector('hot-table');

        $(hot2.getCell(0, 0)).simulate('mousedown').simulate('mouseup');

        // select hot-table #3
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).not.toBe(null);

        keyDown('arrow_down');

        // select hot-table #3
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([1, 0, 1, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).not.toBe(null);

        keyDown('arrow_down');

        // select hot-table #2
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot2.getSelected()).toEqual([1, 0, 1, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);

        keyDown('arrow_down');

        // select hot-table #2 (sibling)
        expect(hot.getSelected()).toEqual([1, 1, 1, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([1, 0, 1, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);
        done();
      }, timeout);
    });

    it('should be possible to select cell of sibling or parent table by an arrow keys navigation (arrow up)', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData(),
        hot;

      div.innerHTML = template;
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1, hot2, hot3, hot4;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 1).querySelector('hot-table');
        hot2 = hot1.getCell(0, 1).querySelector('hot-table');
        hot3 = hot.getCell(1, 1).querySelector('hot-table');
        hot4 = hot3.getCell(0, 1).querySelector('hot-table');

        $(hot2.getCell(0, 0)).simulate('mousedown').simulate('mouseup');

        // select hot-table #3
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).not.toBe(null);

        keyDown('arrow_up');

        // select hot-table #2
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);

        keyDown('arrow_up');

        // select hot-table #1 (root)
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);
        done();
      }, timeout);
    });

    it('should be possible to select cell of child table by press enter key', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData(),
        hot;

      div.innerHTML = template;
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1, hot2, hot3, hot4;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 1).querySelector('hot-table');
        hot2 = hot1.getCell(0, 1).querySelector('hot-table');
        hot3 = hot.getCell(1, 1).querySelector('hot-table');
        hot4 = hot3.getCell(0, 1).querySelector('hot-table');

        $(hot.getCell(0, 0)).simulate('mousedown').simulate('mouseup');

        // select hot-table #1 (root)
        expect(hot.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot1.getSelected()).toEqual(undefined);
        expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot2.getSelected()).toEqual(undefined);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);

        keyDown('arrow_right');
        keyDown('enter');

        // select hot-table #2
        expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
        expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
        expect(hot1.getSelected()).toEqual([0, 0, 0, 0]);
        expect(hot1.instance.view.wt.selections.current.cellRange).not.toBe(null);
        expect(hot2.getSelected()).toEqual(undefined);
        expect(hot2.instance.view.wt.selections.current.cellRange).toBe(null);

        setTimeout(function() {
          keyDown('arrow_right');
          keyDown('enter');

          // select hot-table #3
          expect(hot.getSelected()).toEqual([0, 1, 0, 1]);
          expect(hot.instance.view.wt.selections.current.cellRange).toBe(null);
          expect(hot1.getSelected()).toEqual([0, 1, 0, 1]);
          expect(hot1.instance.view.wt.selections.current.cellRange).toBe(null);
          expect(hot2.getSelected()).toEqual([0, 0, 0, 0]);
          expect(hot2.instance.view.wt.selections.current.cellRange).not.toBe(null);
          done();
        }, 100);
      }, timeout);
    });
  });

  describe('Context Menu', function() {
    it('should appear when "contextmenu" event is fired from nested table', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData()[0],
        hot;

      div.innerHTML =
        '<template is="auto-binding">' +
          // hot-table 1
          '<hot-table dataRows="{{ nestedData }}" contextMenu="true">' +
            '<hot-column value="company" header="Company" editor="false">' +
              '<template data-hot-role="renderer">' +
                // hot-table 2
                '<hot-table dataRows="{{ company }}">' +
                  '<hot-column value="name" header="Name"></hot-column>' +
                '</hot-table>' +
              '</template>' +
            '</hot-column>' +
          '</hot-table>' +
        '</template>';
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 0).querySelector('hot-table');
        hot.selectCell(0, 0);
        hot1.selectCell(0, 0);

        expect($('.htContextMenu').is(':visible')).toBe(false);

        contextMenu(hot1);

        expect($('.htContextMenu').is(':visible')).toBe(true);
        done();
      }, timeout);
    });

    it('should appear with functionalities availables for root hot-table only', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData()[0],
        hot;

      div.innerHTML =
        '<template is="auto-binding">' +
          // hot-table 1
          '<hot-table dataRows="{{ nestedData }}" contextMenu="true">' +
            '<hot-column value="company" header="Company" editor="false">' +
              '<template data-hot-role="renderer">' +
                // hot-table 2
                '<hot-table dataRows="{{ company }}">' +
                  '<hot-column value="name" header="Name"></hot-column>' +
                '</hot-table>' +
              '</template>' +
            '</hot-column>' +
          '</hot-table>' +
        '</template>';
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 0).querySelector('hot-table');
        hot.selectCell(0, 0);
        hot1.selectCell(0, 0);

        expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
        expect(hot1.getCellMeta(0, 0).readOnly).toBe(false);

        contextMenu(hot1);
        $('.htContextMenu .ht_master .htCore').find('tbody td').eq(12).simulate('mousedown');

        expect(hot.getCellMeta(0, 0).readOnly).toBe(true);
        expect(hot1.getCellMeta(0, 0).readOnly).toBe(false);
        done();
      }, timeout);
    });

    it('should appear with functionalities availables for table where event is fired', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData()[0],
        hot;

      div.innerHTML =
        '<template is="auto-binding">' +
          // hot-table 1
          '<hot-table dataRows="{{ nestedData }}" contextMenu="true">' +
            '<hot-column value="company" header="Company" editor="false">' +
              '<template data-hot-role="renderer">' +
                // hot-table 2
                '<hot-table dataRows="{{ company }}" contextMenu="true">' +
                  '<hot-column value="name" header="Name"></hot-column>' +
                '</hot-table>' +
              '</template>' +
            '</hot-column>' +
          '</hot-table>' +
        '</template>';
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        var hot1;

        hot = div.querySelector('hot-table');
        hot1 = hot.getCell(0, 0).querySelector('hot-table');
        hot.selectCell(0, 0);
        hot1.selectCell(0, 0);

        expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
        expect(hot1.getCellMeta(0, 0).readOnly).toBe(false);

        contextMenu(hot1);
        $('.htContextMenu .ht_master .htCore').find('tbody td').eq(12).simulate('mousedown');

        expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
        expect(hot1.getCellMeta(0, 0).readOnly).toBe(true);
        done();
      }, timeout);
    });
  });

  describe('Autofill', function() {
    it('should copy cell (nested table) by dragging the handle', function(done) {
      var
        div = document.createElement('div'),
        data = nestedData(),
        hot;

      data[1].company[0].partners.push({since: 2000, name: 'Z Company'});

      div.innerHTML = template;
      div.querySelector('template').nestedData = data;

      this.$container.append(div);

      setTimeout(function() {
        hot = div.querySelector('hot-table');
        hot.selectCell(0, 1);
        $(hot.shadowRoot.querySelector('#htContainer')).find('.wtBorder.current.corner').simulate('mousedown');
        $(hot.shadowRoot.querySelector('#htContainer')).find('tr:last-child td:eq(1)').simulate('mouseover');
      }, timeout);

      setTimeout(function() {
        $(hot.shadowRoot.querySelector('#htContainer')).find('tr:last-child td:eq(1)').simulate('mouseup');
      }, timeout + 300);

      setTimeout(function() {
        var hot1, hot2;

        hot1 = hot.getCell(1, 1).querySelector('hot-table');
        hot2 = hot1.getCell(0, 1).querySelector('hot-table');

        expect(hot1.getData()).toBe(data[1].company);
        expect(hot1.getCell(0, 0).innerHTML).toBe(data[0].company[0].name);
        expect(hot2.getData()).toBe(data[1].company[0].partners);
        expect(hot2.getCell(0, 0).innerHTML).toBe(data[0].company[0].partners[0].since + '');
        done();
      }, timeout + 600);
    });
  });
});
