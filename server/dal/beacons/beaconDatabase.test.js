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
           .withRequired(30, 'yk7EooUDkOKQA9zj', 'Title_30', 'Description_30', 35, -86)
           .withAddress('1563 N Thompson Ln', '37129')
           .withNumberOfPeople('4')
           .createBeacon(),
  factories.newBeaconFactory()
           .withRequired(31, 'a9ZaRCDMCo0WWZO7', 'Title_31', 'Description_31', 35.1, -86.1)
           .withAddress('1565 N Thompson Ln', '37129')
           .withNumberOfPeople('3-4')
           .createBeacon(),
  factories.newBeaconFactory()
           .withRequired(32, 'a9ZaRCDMCo0WWZO7', 'Title_32', 'Description_32', 35.2, -86.2)
           .withNumberOfPeople('4-5 people')
           .withDate(new Date(2015, 10, 1, 3, 4))
           .createBeacon(),
  factories.newBeaconFactory()
           .withRequired(33, 'yk7EooUDkOKQA9zj', 'Title_33', 'Description_33', 35.3, -86.3)
           .withNumberOfPeople('1-2')
           .createBeacon(),
  factories.newBeaconFactory()
           .withRequired(34, 'yk7EooUDkOKQA9zj', 'Title_34', 'Description_34', 35.4, -86.4)
           .withAddress('1571 N Thompson Ln', '37129')
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