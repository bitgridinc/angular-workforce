"use strict";

var entityDatabase = require('./entityDatabase.hardcoded');
var nextEntity = 0;

module.exports = {
  getAllEntities: function() {
    return entityDatabase.entities;
  },
  getCurrentEntity: function() {
    if (process.env.aat) {
      return entityDatabase.entities[1];
    }

    if (nextEntity >= entityDatabase.entities.length) {
      nextEntity = 0;
    }

    return entityDatabase.entities[nextEntity++];
  }
};
