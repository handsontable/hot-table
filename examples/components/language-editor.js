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

  Polymer({
    is: 'language-editor',

    properties: {
      selected: {
        type: Array
      }
    },

    observers: [
      '_selectedChanged(selected)'
    ],

    /**
     * Listener for checkbox on-change event.
     *
     * @param {Event} event
     */
    onChange: function(event) {
      var lang = event.model.lang;

      if (event.target.checked) {
        this.selected.push(lang.code);

      } else {
        if (this.selected.indexOf(lang.code) !== -1) {
          this.selected.splice(this.selected.indexOf(lang.code), 1);
        }
      }
    },

    /**
     * Property observer for `selected` attribute.
     *
     * @param {Array} selected
     */
    _selectedChanged: function(selected) {
      var languages = [],
        item,
        i;

      for (i in availableCountries) {
        if (availableCountries.hasOwnProperty(i)) {
          item = {
            code: i,
            name: availableCountries[i]
          };
          item.checked = selected.indexOf(item.code) >= 0;

          languages.push(item);
        }
      }
      this.languages = languages;
    },

    computeSrc: function(lang) {
      return './resources/flags/' + lang.code + '.png';
    }
  });

})();
