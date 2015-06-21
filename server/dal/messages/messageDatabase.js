"use strict";

var testData = require('./messageDatabase.test.js')
  , prodData = require('./messageDatabase.prod.js')
  , environment = require('../../environment.js')
  , _ = require('lodash');

function db() {
  return environment.runningInTestMode() ? testData : prodData;
}

function findMessageById(messageId) {
  return _.find(db(), function(message) {
    return message.id === messageId;
  });
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
    findMessageById(messageId).accepted = true;
  }
};
