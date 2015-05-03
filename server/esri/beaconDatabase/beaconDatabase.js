"use strict";

var hardcodedBeaconDatabase = require('./beaconDatabase.hardcoded.js'),
    esriBeaconDatabase = require('./beaconDatabase.esri.js');

module.exports = {
  saveBeacon: function(beacon, successCallback) {
    if (process.env.aat) {
      hardcodedBeaconDatabase.saveBeacon(beacon, successCallback);
    } else {
      esriBeaconDatabase.saveBeacon(beacon, successCallback);
    }
  },
  getAllBeacons: function(successCallback) {
    if (process.env.aat) {
      hardcodedBeaconDatabase.getAllBeacons(successCallback);
    } else {
      esriBeaconDatabase.getAllBeacons(successCallback);
    }
  },
  getBeaconById: function(id, successCallback) {
    if (process.env.aat) {
      hardcodedBeaconDatabase.getBeaconById(id, successCallback);
    } else {
      esriBeaconDatabase.getBeaconById(id, successCallback);
    }
  }
};