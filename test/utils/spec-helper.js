
var currentSpec = {},
  ready = false,
  timeout = 100,
  _done;

document.addEventListener('WebComponentsReady', function() {
  ready = true;
  _done();
});

beforeEach(function(done) {
  currentSpec = this;
  this.$container = $('<div id="test-container"></div>').appendTo('body');

  if (ready) {
    done();
  } else {
    _done = done;
  }
});

afterEach(function() {
  if (this.$container) {
    this.$container.remove();
  }
});

beforeEach(function() {
  jasmine.addMatchers({
    toBeFunction: function() {
      return {
        compare: function(actual, expected) {
          var passed = typeof actual === 'function';

          return {
            pass: passed,
            message: 'Expected ' + actual + (passed ? '' : ' not') + ' to equal ' + expected
          };
        }
      };
    }
  });
});

function spec() {
  return currentSpec;
}

/**
 * @returns {HTMLElement}
 */
function getHotTable() {
  return spec().$container.find('hot-table')[0];
}

/**
 * @returns {jQuery}
 */
function getHtCoreElement() {
  return $(getHotTable().instance.rootElement).find('.htCore').first();
}

/**
 * @returns {jQuery}
 */
function getTopCloneElement() {
  return $(getHotTable().instance.rootElement).find('.ht_clone_top').first();
}

/**
 * @returns {jQuery}
 */
function getLeftCloneElement() {
  return $(getHotTable().instance.rootElement).find('.ht_clone_left').first();
}


function countTD() {
  return getHtCore().find('tbody td').length;
}

/**
 * Check if editor is visible or not
 *
 * @returns {Boolean}
 */
function isEditorVisible() {
  return !!(getEditorHolder().is(':visible') && !getEditorHolder().is('.htHidden'));
}

/**
 * Get editor holder element
 *
 * @returns {jQuery}
 */
function getEditorHolder() {
  return $(getHotTable().instance.rootElement).find('.handsontableInputHolder');
}

/**
 * Returns a function that triggers a mouse event
 *
 * @param {String} type Event type
 * @param {Number} button
 * @returns {Function}
 */
function handsontableMouseTriggerFactory(type, button) {
  return function(element) {
    var ev = $.Event(type);

    if (!(element instanceof jQuery)) {
      element = $(element);
    }
    // left click by default
    ev.which = button || 1;
    element.simulate(type, ev);
  };
}

var mouseDown = handsontableMouseTriggerFactory('mousedown');
var mouseUp = handsontableMouseTriggerFactory('mouseup');
var mouseRightDown = handsontableMouseTriggerFactory('mousedown', 3);
var mouseRightUp = handsontableMouseTriggerFactory('mouseup', 3);

var mouseDoubleClick = function(element) {
  mouseDown(element);
  mouseUp(element);
  mouseDown(element);
  mouseUp(element);
};

/**
 * Returns a function that triggers a key event
 *
 * @param {String} type Event type
 * @returns {Function}
 */
function handsontableKeyTriggerFactory(type) {
  return function(key, extend) {
    var ev = {};

    if (typeof key === 'string') {
      if (key.indexOf('shift+') > -1) {
        key = key.substring(6);
        ev.shiftKey = true;
      }

      if (key.indexOf('ctrl+') > -1) {
        key = key.substring(5);
        ev.ctrlKey = true;
      }

      switch (key) {
        case 'tab':
          ev.keyCode = 9;
          break;

        case 'enter':
          ev.keyCode = 13;
          break;

        case 'esc':
          ev.keyCode = 27;
          break;

        case 'f2':
          ev.keyCode = 113;
          break;

        case 'arrow_left':
          ev.keyCode = 37;
          break;

        case 'arrow_up':
          ev.keyCode = 38;
          break;

        case 'arrow_right':
          ev.keyCode = 39;
          break;

        case 'arrow_down':
          ev.keyCode = 40;
          break;

        case 'ctrl':
          ev.keyCode = 17;
          break;

        case 'shift':
          ev.keyCode = 16;
          break;

        case 'backspace':
          ev.keyCode = 8;
          break;

        case 'space':
          ev.keyCode = 32;
          break;

        default:
          throw new Error('Unrecognised key name: ' + key);
      }
    } else if (typeof key === 'number') {
      ev.keyCode = key;
    }
    $.extend(ev, extend);
    $(document.activeElement).simulate(type, ev);
  };
}

var keyDown = handsontableKeyTriggerFactory('keydown');
var keyUp = handsontableKeyTriggerFactory('keyup');

/**
 * Presses keyDown, then keyUp
 *
 * @param {String} key
 * @param {*} extend
 */
function keyDownUp(key, extend) {
  if (typeof key === 'string' && key.indexOf('shift+') > -1) {
    keyDown('shift');
  }
  keyDown(key, extend);
  keyUp(key, extend);

  if (typeof key === 'string' && key.indexOf('shift+') > -1) {
    keyUp('shift');
  }
}

function serveImmediatePropagation(event) {
  if (event != null && event.isImmediatePropagationEnabled == null) {
    event.stopImmediatePropagation = function() {
      this.isImmediatePropagationEnabled = false;
      this.cancelBubble = true;
    };
    event.isImmediatePropagationEnabled = true;
    event.isImmediatePropagationStopped = function() {
      return !this.isImmediatePropagationEnabled;
    };
  }

  return event;
}

/**
 * Shows context menu
 * @param {HTMLElement} hot
 */
function contextMenu(hot) {
  hot = hot || getHotTable();
  var selected = hot.getSelected();

  if (!selected) {
    hot.selectCell(0, 0);
    selected = hot.getSelected();
  }
  var cell = hot.getCell(selected[0], selected[1]);
  var cellOffset = $(cell).offset();

  $(cell).simulate('contextmenu', {
    clientX: cellOffset.left,
    clientY: cellOffset.top
  });
}

function closeContextMenu() {
  $(document).simulate('mousedown');
}
