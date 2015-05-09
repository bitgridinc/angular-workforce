"use strict";

var hardcodedBeaconDatabase = require('./beaconDatabase.hardcoded.js')
  , esriBeaconDatabase = require('./beaconDatabase.esri.js');

function runningForAATs() {
  // The presence of the aat env var indicates we're running for our AATs
  return process.env.aat;
}

module.exports = {
  saveBeacon: function(beacon, successCallback) {
    if (runningForAATs()) {
      hardcodedBeaconDatabase.saveBeacon(beacon, successCallback);
    } else {
      esriBeaconDatabase.saveBeacon(beacon, successCallback);
    }
  },
  getAllBeacons: function(successCallback) {
    if (runningForAATs()) {
      hardcodedBeaconDatabase.getAllBeacons(successCallback);
    } else {
      esriBeaconDatabase.getAllBeacons(successCallback);
    }
  },
  getBeaconById: function(id, successCallback) {
    if (runningForAATs()) {
      hardcodedBeaconDatabase.getBeaconById(id, successCallback);
    } else {
      esriBeaconDatabase.getBeaconById(id, successCallback);
    }
  }
};