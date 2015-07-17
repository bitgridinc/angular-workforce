"use strict";

var _ = require('lodash')
  , factories = require('../../../shared/factories');

module.exports = {
  featureToBeacon: function(feature) {
    var attributes = feature.attributes
      , beaconId = attributes.ObjectId
      , lat = feature.geometry.y
      , lng = feature.geometry.x;
    return factories.newBeaconFactory()
                    .withRequired(beaconId, attributes.senderId, attributes.title, attributes.description, lat, lng)
                    .withAddress(attributes.streetAddress, attributes.zip)
                    .withNumberOfPeople(attributes.numberOfPeople)
                    .createBeacon();
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
        zip: beacon.zip,
        numberOfPeople: beacon.numberOfPeople
      }
    }
  }
};