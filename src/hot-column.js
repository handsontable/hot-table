(function () {

  var publicProperties = Object.keys(Handsontable.DefaultSettings.prototype);

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

  Polymer({
    is: 'hot-column',
    
    publish: getPublishProperties(),

    ready: function () {
      this.registerRenderer(findRenderer(this));
      this.registerEditor(findEditor(this));

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
     * @param {Element} element Template element
     */
    registerRenderer: function(element) {
      var cache;

      if (!element) {
        return;
      }
      cache = new WeakMap();

      this.renderer = function(instance, TD, row, col, prop, value, cellProperties) {
        var valueKey = prop,
          node, model, oldValue;

        oldValue = cache.get(TD);
        Handsontable.renderers.cellDecorator.apply(this, arguments);

        // Prevent re-render cells that are not changed
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
    },

    /**
     * Register cell editor
     *
     * @param {Element} element Template element
     */
    registerEditor: function(element) {
      if (!element) {
        return;
      }
      this.editor = ProxyEditor;

      function ProxyEditor(instance) {
        HotTableUtils.Editor.call(this, instance);
        this.template = element;
      }

      ProxyEditor.prototype = Object.create(HotTableUtils.Editor.prototype, {
        constructor: {
          value: HotTableUtils.Editor,
          configurable: true
        }
      });
    }
  });
}());
