"use strict";

var entityDatabase = require('./entityDatabase');
var nextEntity = 0;

module.exports = {
  getAllEntities: function() {
    return entityDatabase.entities;
  },
  getCurrentEntity: function() {
    if (process.env.aat) {
      console.log('HERE', process.env);
      return entityDatabase.entities[1];
    }

    if (nextEntity >= entityDatabase.entities.length) {
      nextEntity = 0;
    }

    return entityDatabase.entities[nextEntity++];
  }
};
