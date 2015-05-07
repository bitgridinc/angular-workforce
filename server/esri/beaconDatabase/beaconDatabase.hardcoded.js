"use strict";

var _ = require('lodash'),
    factories = require('../../../shared/factories');

var beacons = [
  factories.newBeaconFactory()
           .withIds(30, '7a95759f-3df8-4f16-bb43-24f4329fe3df')
           .withSummaryText('Murfreesboro Title', 'Murfreesboro Description')
           .withAddress('1563 N Thompson Ln')
           .withNumberOfPeople('4')
           .withResponse(factories.newAssistanceResponseFactory()
                                  .withIds('2cf8faaa-5760-41c9-adbf-5a4482ac3469', '323f8a60-37c6-4d97-a2f8-331c2231e92b', 30)
                                  .withResponderCrew('4', new Date(2015, 1, 1, 1, 1, 1))
                                  .createAssistanceResponse())
           .createBeacon(),
  factories.newBeaconFactory()
           .withIds(31, '323f8a60-37c6-4d97-a2f8-331c2231e92b')
           .withSummaryText('Morristown Title', 'Morristown Description')
           .withAddress('1565 N Thompson Ln')
           .withNumberOfPeople('3-4')
           .createBeacon()
];

module.exports = {
  saveBeacon: function(beacon, successCallback) {
    // This mimics ArcGIS by adding 1 to the highest ObjectID
    if (!beacon.id) {
      beacon.id = _.max(beacons, function(beacon) {
        return beacon.id;
      }).id + 1;
    }

    beacons.push(beacon);

    successCallback({
      objectId: beacon.id
    });
  },
  getAllBeacons: function(successCallback) {
    successCallback(beacons);
  },
  getBeaconById: function(id, successCallback) {
    var beacon = _.find(beacons, function(beacon) {
      return beacon.id === id;
    });
    if (beacon) {
      successCallback(beacon);
    }
  }
};