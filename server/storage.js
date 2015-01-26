"use strict";

var state = require('./storageState');

var nextEntity = 0;

module.exports = {
  saveBeacon: function(beacon) {
    console.log('repository.saveBeacon called.', beacon);
  },
  getAllMessages: function() {
    return state.messages;
  },
  getAllEntities: function() {
    return state.entities;
  },
  getCurrentEntity: function () {
    if (nextEntity >= state.entities.length) {
      nextEntity = 0;
    }

    return state.entities[nextEntity++];
  }
};
