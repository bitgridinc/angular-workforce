"use strict";

var hardcodedBeaconDatabase = require('./beaconDatabase.hardcoded.js')
  , esriBeaconDatabase = require('./beaconDatabase.esri.js')
  , environment = require('../../../shared/environment.js');

module.exports = {
  saveBeacon: function(beacon, successCallback) {
    if (environment.runningInTestMode()) {
      hardcodedBeaconDatabase.saveBeacon(beacon, successCallback);
    } else {
      esriBeaconDatabase.saveBeacon(beacon, successCallback);
    }
  },
  getAllBeacons: function(successCallback) {
    if (environment.runningInTestMode()) {
      hardcodedBeaconDatabase.getAllBeacons(successCallback);
    } else {
      esriBeaconDatabase.getAllBeacons(successCallback);
    }
  },
  getBeaconById: function(id, successCallback) {
    if (environment.runningInTestMode()) {
      hardcodedBeaconDatabase.getBeaconById(id, successCallback);
    } else {
      esriBeaconDatabase.getBeaconById(id, successCallback);
    }
  }
};