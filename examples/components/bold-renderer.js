(function () {

  Polymer('bold-renderer', {
    attributeChanged: function(attrName, oldVal, newVal) {
      if (attrName === 'value') {
        this.value = newVal;
      }
    }
  });

})();
