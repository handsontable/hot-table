(function () {

  var availableCountries = {
    be: 'Belgium',
    br: 'Brazil',
    cz: 'Czech Republic',
    de: 'Germany',
    dk: 'Denmark',
    es: 'Estonia',
    nl: 'Netherlands',
    no: 'Norway',
    pk: 'Pakistan',
    pl: 'Poland',
    ru: 'Russia',
    se: 'Sweden',
    tj: 'Tajikistan',
    tk: 'Tokelau',
    us: 'United States'
  };

  Polymer('language-editor', {

    created: function() {
      this._selected = [];
    },

    /**
     * Listener for checkbox on-change event
     *
     * @param {DOMEvent} event
     * @param {Object} detail
     * @param {HTMLElement} sender
     */
    onChange: function(event, detail, sender) {
      var lang = event.target.templateInstance.model.lang;

      if (event.target.checked) {
        this._selected.push(lang.code);

      } else {
        if (this._selected.indexOf(lang.code) !== -1) {
          this._selected.splice(this._selected.indexOf(lang.code), 1);
        }
      }
      this.selected = this._selected;
    },

    /**
     * Property observer for `selected` attribute
     *
     * @param {*} oldValue
     * @param {*} newValue
     */
    selectedChanged: function(oldValue, newValue) {
      var languages = [],
        item,
        i;

      if (newValue) {
        this._selected = this.selected.map(function(value) {
          return value;
        });

      } else {
        this._selected = [];
      }

      for (i in availableCountries) {
        if (availableCountries.hasOwnProperty(i)) {
          item = {
            code: i,
            name: availableCountries[i]
          };
          item.checked = this._selected.indexOf(item.code) >= 0;

          languages.push(item);
        }
      }

      this.languages = languages;
    }
  });

})();
