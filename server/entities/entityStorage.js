"use strict";

var entityDatabase = require('./entityDatabase');
var nextEntity = 0;

module.exports = {
  getAllEntities: function() {
    return entityDatabase.entities;
  },
  getCurrentEntity: function () {
    if (nextEntity >= entityDatabase.entities.length) {
      nextEntity = 0;
    }

    return entityDatabase.entities[nextEntity++];
  }
};
