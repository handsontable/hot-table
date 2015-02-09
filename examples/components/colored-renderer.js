(function () {

  Polymer('colored-renderer', {
    attributeChanged: function(attrName, oldVal, newVal) {
      if (attrName === 'value') {
        this.splitValue(newVal);
      }
    },

    /**
     * Split string into array
     */
    splitValue: function(value) {
      if (value) {
        this.splitedValue = value.split('');
      }
    }
  });

})();
