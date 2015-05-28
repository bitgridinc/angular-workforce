"use strict";

var testData = require('./messageDatabase.test.js')
  , prodData = require('./messageDatabase.prod.js')
  , environment = require('../../environment.js')
  , _ = require('lodash');

function db() {
  return environment.runningInTestMode() ? testData : prodData;
}

module.exports = {
  getMessagesByBeaconId: function(beaconId) {
    return _.filter(db(), function(message) {
      return message.beaconId === beaconId;
    });
  },
  saveMessage: function(message) {
    db().push(message);
  },
  acceptMessage: function(messageId) {
    // TODO: UNFINISHED
    db().accepted = true;
  }
};
