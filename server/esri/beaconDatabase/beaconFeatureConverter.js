"use strict";

var _ = require('lodash'),
    factories = require('../../../shared/factories');

module.exports = {
  featureToBeacon: function(feature) {
    var attributes = feature.attributes;
    return factories.newBeaconFactory()
      .withIds(attributes.ObjectId, attributes.senderId)
      .withSummaryText(attributes.title, attributes.description)
      .withLocation(feature.geometry.y, feature.geometry.x)
      .withAddress(attributes.streetAddress)
      .withNumberOfPeople(attributes.numberOfPeople)
      .createBeacon()
  },
  beaconToFeature: function(beacon) {
    return {
      geometry: {
        x: beacon.lng,
        y: beacon.lat,
        // Indicates that x and y are in longitude and latitude (WGS 1984)
        spatialReference: {
          wkid: 4326
        }
      },
      attributes: {
        senderId: beacon.senderId,
        title: beacon.title,
        description: beacon.description,
        streetAddress: beacon.streetAddress,
        numberOfPeople: beacon.numberOfPeople
      }
    }
  }
};