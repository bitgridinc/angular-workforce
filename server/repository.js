"use strict";

var state = require('./repositoryState');

var nextEntity = 0;

module.exports = {
  createBeacon: function(beacon) {
    console.log('repository.createBeacon called.', beacon);
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
