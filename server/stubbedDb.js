"use strict";

var names = [
  'Macho Diggers',
  'Determined Douchebags',
  'Apostolic Aphids'
];
var nextName = 0;

module.exports = {
  getOrganization: function () {
    if (nextName >= names.length) {
      nextName = 0;
    }

    return {
      name: names[nextName++]
    };
  }
};
