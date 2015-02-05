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
    return element.querySelector('[data-hot-role=renderer]');
  }
  function findEditor(element) {
    return element.querySelector('[data-hot-role=editor]');
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
      if (!element) {
        return;
      }
      var cache = new WeakMap();

      this.renderer = function(instance, TD, row, col, prop, value, cellProperties) {
        var node, model;

        if (cache.has(TD) || !TD.parentNode) {
          return;
        }
        // TODO: move below performance tip into Handsontable
        cache.set(TD, true);
        model = {
          td: TD,
          row: row,
          col: col,
          prop: prop,
          value: value,
          meta: cellProperties
        };

        if (element.nodeName === 'TEMPLATE') {
          node = element.createInstance(model);
        }
        else {
          node = element.cloneNode(true);
          node.value = model;
        }

        TD.textContent = '';
        TD.appendChild(node);
      };
    }
  });
})();
