"use strict";

var factories = require('../../../shared/factories');

var beacons = [
  factories.newBeaconFactory()
    .withIds(30, '7a95759f-3df8-4f16-bb43-24f4329fe3df')
    .withSummaryText('Murfreesboro Title', 'Murfreesboro Description')
    .withLocation(0, 0)
    .withAddress('1563 N Thompson Ln')
    .withNumberOfPeople('4')
    .createBeacon()
];

module.exports = {
  saveBeacon: function(beacon, successCallback) {
    beacons.push(beacon);
  },
  getAllBeacons: function(successCallback) {
    successCallback(beacons);
  },
  getBeaconById: function(id, successCallback) {
    successCallback(beacons[0]);
  }
};