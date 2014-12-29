"use strict";

var entities = [
  {
    name: 'Macho Diggers',
    id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
  },
  {
    name: 'Determined Douchebags',
    id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
  },
  {
    name: 'Apostolic Aphids',
    id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54'
  }
];
var next = 0;

module.exports = {
  getAllEntities: function() {
    return entities
  },
  getCurrentEntity: function () {
    if (next >= entities.length) {
      next = 0;
    }

    return entities[next++];
  }
};
