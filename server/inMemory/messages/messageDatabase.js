"use strict";

var testData = require('./messageDatabase.hardcoded')
  , environment = require('../../environment.js')
  , data = []
  , _ = require('lodash');

module.exports = {
  getMessagesByBeaconId: function(beaconId) {
    return _.filter(environment.runningInTestMode() ? testData : data, function(message) {
      return message.beaconId === beaconId;
    });
  },
  saveMessage: function(message) {
    (environment.runningInTestMode() ? testData : data).push(message);
  }
};
