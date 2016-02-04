(function() {

  if (!Handsontable.helper.isWebComponentSupportedNatively()) {
    return;
  }

  var
    owner = (document._currentScript || document.currentScript).ownerDocument;

  function AgeRenderer() {

  }

  AgeRenderer.prototype = Object.create(HTMLElement.prototype, {
    constructor: {
      value: AgeRenderer,
      configurable: true
    }
  });

  /**
   * On create custom element.
   */
  AgeRenderer.prototype.createdCallback = function() {
    this.shadow = this.createShadowRoot();
    this.shadow.appendChild(owner.querySelector("#template").content.cloneNode(true));
    this.holder = this.shadowRoot.querySelector('#holder');
  };

  /**
   * On attached to the DOM custom element.
   */
  AgeRenderer.prototype.attachedCallback = function() {
    this.updateAge(this.age);
  };

  /**
   * Render element.
   */
  AgeRenderer.prototype.updateAge = function(age) {
    var desc = this.holder.querySelector('#message');

    this.age = parseInt(age, 10);

    if (isNaN(this.age)) {
      this.age = '';
    }
    this.holder.querySelector('#age').textContent = this.age;

    if (this.age) {
      if (this.age < 18) {
        desc.classList.add('invalid');
        desc.textContent = 'Too young!';

      } else if (this.age >= 18 && this.age < 50) {
        desc.classList.remove('invalid');
        desc.textContent = 'Perfect age!';

      } else {
        desc.classList.add('invalid');
        desc.textContent = 'Too old!';
      }
    } else {
      desc.classList.remove('invalid');
      desc.textContent = '???';
    }
  };

  AgeRenderer.prototype.attributeChangedCallback = function(attribute, oldVal, newVal) {
    if (attribute === 'age') {
      this.updateAge(newVal);
    }
  };

  document.registerElement('age-renderer', AgeRenderer);
}());
