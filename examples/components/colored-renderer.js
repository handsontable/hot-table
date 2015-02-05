(function () {

  Polymer('colored-renderer', {
    attached: function () {
      if (this.value) {
        this.splitedValue = this.value.value.split('');
      }
    }
  });

})();
