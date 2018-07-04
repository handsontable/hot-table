(function() {
  var
    settingsParser = new HotTableUtils.SettingsParser();

  function findRenderer(element) {
    return Polymer.dom(element).querySelector('template[data-hot-role=renderer]');
  }
  function findEditor(element) {
    return Polymer.dom(element).querySelector('template[data-hot-role=editor]');
  }

  Polymer({
    is: 'hot-column',
    properties: settingsParser.getHotColumnProperties(),

    attached: function() {
      this.registerRenderer(findRenderer(this));
      this.registerEditor(findEditor(this));

      if (this.parentNode && this.parentNode.onMutation) {
        this.parentNode.onMutation();
      }
    },

    attributeChanged: function() {
      this._onChanged();
    },

    _onChanged: function() {
      if (this.parentNode && this.parentNode.onMutation) {
        this.parentNode.onMutation();
      }
    },

    /**
     * Register cell renderer.
     *
     * @param {Element} template Template element
     */
    registerRenderer: function(template) {
      if (!template) {
        return;
      }
      var models = new WeakMap();
      var Template;

      if (Polymer.Element) { // Polymer 2.0
        Template = Polymer.Templatize.templatize(template, this, {
          parentModel: false,
          forwardHostProp: function(prop, value) {}
        });
      } else if (Polymer.Templatizer && Polymer.Templatizer.templatize) { // Polymer 1.7 - 1.9
        Polymer.Templatizer.templatize(template);
      }

      this.renderer = function(instance, TD, row, col, prop, value, cellProperties) {
        var model, hasModel;

        Handsontable.renderers.cellDecorator.apply(this, arguments);
        hasModel = models.has(TD);

        if (hasModel) {
          model = models.get(TD);

        } else {
          if (Polymer.Element) {
            model = new Template();
          } else {
            // Don't copy parent properties. Stamp fresh template instance.
            template._parentProps = {};
            model = template.stamp ? template.stamp({}) : Polymer.Templatizer.stamp({});
          }
          models.set(TD, model);
        }
        model.row = row;
        model.col = col;
        model.prop = prop;
        model.cellProperties = cellProperties;
        model.value = value;

        TD.style.whiteSpace = 'normal';

        if (!hasModel) {
          TD.textContent = '';
          Polymer.dom(TD).appendChild(model.root);
        }
      };
    },

    /**
     * Register cell editor.
     *
     * @param {Element} template Template element
     */
    registerEditor: function(template) {
      if (!template) {
        return;
      }
      this.editor = ProxyEditor;

      var Template;

      if (Polymer.Element) {
        Template = Polymer.Templatize.templatize(template, this, {
          parentModel: false,
          forwardHostProp: function(prop, value) {}
        });
      }

      function ProxyEditor(hotInstance) {
        HotTableUtils.Editor.call(this, hotInstance);
        this.setTemplate(Polymer.Element ? Template : template);
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
