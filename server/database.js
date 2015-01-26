"use strict";

var entities = [
  {
    name: 'Your Organization',
    id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
  },
  {
    name: 'Their Organization',
    id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
  },
  {
    name: 'Third Organization',
    id: 'c1d8d77c-b4d7-4007-a5ea-a0564c751f54'
  }
];
var next = 0;

module.exports = {
  createBeacon: function(beacon) {
    console.log('database.createBeacon called.', beacon);
  },
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
