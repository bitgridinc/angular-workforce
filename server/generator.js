"use strict";

var names = [
  'Macho Diggers',
  'Determined Douchebags',
  'Apostolic Aphids'
];
var nextName = 0;

module.exports = {
  generateName: function () {
    if (nextName >= names.length) {
      nextName = 0;
    }

    return names[nextName++];
  }
};
