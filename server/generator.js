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
  },
  generateGuid: function () {
    function _p8(s) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
  }
};
