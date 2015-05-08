"use strict";

var aatData = require('./messageDatabase.hardcoded')
  , data = []
  , _ = require('lodash');

module.exports = {
  getMessagesByBeaconId: function(beaconId) {
    return _.filter(process.env.aat ? aatData : data, function(message) {
      return message.beaconId === beaconId;
    });
  },
  saveMessage: function(message) {
    (process.env.aat ? aatData : data).push(message);
  }
};
