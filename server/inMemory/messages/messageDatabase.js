"use strict";

var testData = require('./messageDatabase.hardcoded')
  , environment = require('../../environment.js')
  , data = []
  , _ = require('lodash');

function db() {
  return environment.runningInTestMode() ? testData : data;
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
    db().accepted = true;
  }
};
