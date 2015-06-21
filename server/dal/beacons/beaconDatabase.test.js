"use strict";

var _ = require('lodash')
  , factories = require('../../../shared/factories');

/**
 * 30 - from Murfreesboro with a Morristown response
 * 31 - from Morristown with no responses
 * 32 - from Morristown with a Murfreesboro response
 * 33 - from Murfreesboro with no responses
 * 34 - from Murfreesboro with an accepted Morristown response
 */
var beacons = [
  factories.newBeaconFactory()
           .withIds(30, 'yk7EooUDkOKQA9zj')
           .withSummaryText('Title_30', 'Description_30')
           .withAddress('1563 N Thompson Ln')
           .withNumberOfPeople('4')
           .createBeacon(),
  factories.newBeaconFactory()
           .withIds(31, 'a9ZaRCDMCo0WWZO7')
           .withSummaryText('Title_31', 'Description_31')
           .withAddress('1565 N Thompson Ln')
           .withNumberOfPeople('3-4')
           .createBeacon(),
  factories.newBeaconFactory()
           .withIds(32, 'a9ZaRCDMCo0WWZO7')
           .withSummaryText('Title_32', 'Description_32')
           .withAddress('1567 N Thompson Ln')
           .withNumberOfPeople('4-5')
           .createBeacon(),
  factories.newBeaconFactory()
           .withIds(33, 'yk7EooUDkOKQA9zj')
           .withSummaryText('Title_33', 'Description_33')
           .withAddress('1569 N Thompson Ln')
           .withNumberOfPeople('1-2')
           .createBeacon(),
  factories.newBeaconFactory()
           .withIds(34, 'yk7EooUDkOKQA9zj')
           .withSummaryText('Title_34', 'Description_34')
           .withAddress('1571 N Thompson Ln')
           .withNumberOfPeople('1-7')
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