(function () {

  var publicProperties = Object.keys(Handsontable.DefaultSettings.prototype);

  publicProperties.push('groups', 'settings', 'source', 'title', 'checkedTemplate',
    'uncheckedTemplate', 'renderer', 'format');

  function getPublishProperties() {
    var publish = {};

    publicProperties.forEach(function (hotProp) {
      var wcProp;

      if (!publish[hotProp]) {
        wcProp = hotProp;

        if (hotProp === 'data') {
          wcProp = 'value';
        }
        else if (hotProp === 'title') {
          // rename 'title' attribute to 'header' because 'title' was causing
          // problems (https://groups.google.com/forum/#!topic/polymer-dev/RMMsV-D4HVw)
          wcProp = 'header';
        }

        // Polymer does not like undefined
        publish[wcProp] = null;
      }
    });

    return publish;
  }

  function findRenderer(element) {
    return element.querySelector('template[data-hot-role=renderer]');
  }
  function findEditor(element) {
    return element.querySelector('template[data-hot-role=editor]');
  }

  Polymer('hot-column', {
    publish: getPublishProperties(),

    ready: function () {
      this.registerRenderer(findRenderer(this));

      if (this.parentNode && this.parentNode.onMutation) {
        this.parentNode.onMutation();
      }
    },

    attributeChanged: function () {
      if (this.parentNode) {
        this.parentNode.onMutation();
      }
    },

    /**
     * Register cell renderer
     *
     * @param {Element} element Can be CustomElement or Template element
     */
    registerRenderer: function(element) {
      var cache;

      if (!element) {
        return;
      }
      cache = new WeakMap();

      // TODO: Check if 'renderer' is called from 4 to 8 times when single cell is rendered
      this.renderer = function(instance, TD, row, col, prop, value, cellProperties) {
        var valueKey = prop,
          node, model, oldValue;

        if (!TD.parentNode) {
          return;
        }
        oldValue = cache.get(TD);

        if (oldValue === value) {
          return;
        }
        cache.set(TD, value);

        model = {
          row: row,
          col: col
        };
        if (prop.indexOf('.') !== -1) {
          valueKey = prop.split('.')[0];
          model[valueKey] = instance.getDataAtRowProp(row, valueKey);
        } else {
          model[valueKey] = value;
        }
        node = element.createInstance(model);

        TD.textContent = '';
        TD.appendChild(node);
      };
    }
  });
})();
