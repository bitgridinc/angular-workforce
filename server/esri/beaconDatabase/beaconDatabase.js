"use strict";

var testBeaconDatabase = require('./beaconDatabase.test.js')
  , prodBeaconDatabase = require('./beaconDatabase.prod.js')
  , environment = require('../../environment.js');

module.exports = {
  saveBeacon: function(beacon, successCallback) {
    if (environment.runningInTestMode()) {
      testBeaconDatabase.saveBeacon(beacon, successCallback);
    } else {
      prodBeaconDatabase.saveBeacon(beacon, successCallback);
    }
  },
  getAllBeacons: function(successCallback) {
    if (environment.runningInTestMode()) {
      testBeaconDatabase.getAllBeacons(successCallback);
    } else {
      prodBeaconDatabase.getAllBeacons(successCallback);
    }
  },
  getBeaconById: function(id, successCallback) {
    if (environment.runningInTestMode()) {
      testBeaconDatabase.getBeaconById(id, successCallback);
    } else {
      prodBeaconDatabase.getBeaconById(id, successCallback);
    }
  }
};