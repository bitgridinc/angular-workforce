"use strict";

var factories = require('../../../shared/factories');

var beacons = [
  factories.newBeaconFactory()
           .withIds(30, '7a95759f-3df8-4f16-bb43-24f4329fe3df')
           .withSummaryText('Murfreesboro Title', 'Murfreesboro Description')
           .withLocation(0, 0)
           .withAddress('1563 N Thompson Ln')
           .withNumberOfPeople('4')
           .withResponse(factories.newAssistanceResponseFactory()
                                  .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 30)
                                  .withResponderCrew('4', new Date(2015, 1, 1, 1, 1, 1))
                                  .createAssistanceResponse())
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