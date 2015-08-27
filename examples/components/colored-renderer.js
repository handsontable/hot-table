(function () {

  Polymer({
    is: 'colored-renderer',

    properties: {
      value: {
        type: String,
        observer: '_onChanged'
      }
    },

    /**
     * Split string into array
     */
    splitValue: function (value) {
      this.splitedValue = typeof value === 'string' ? value.split('') : [];
    },

    computeStyle: function(i) {
      return 'color: ' + (i % 2 ? 'red' : 'green');
    },

    _onChanged: function(value) {
      this.splitValue(value);
    }
  });

})();
