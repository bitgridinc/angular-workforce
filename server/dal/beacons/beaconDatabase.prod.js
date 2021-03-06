"use strict";

var _ = require('lodash')
  , beaconFeatureConverter = require('./beaconFeatureConverter')
  , featureServer = require('./featureServer');

module.exports = {
  saveBeacon: function(beacon, successCallback) {
    var add_params = {
      f: 'json',
      features: [ beaconFeatureConverter.beaconToFeature(beacon) ]
    };

    featureServer.makeRequest(function(featureServer) {
      featureServer.prototype.add(add_params, function(err, result) {
        if (err) {
          console.log("ERROR adding feature: ", err);
          throw new Error(err);
        } else {
          successCallback(result.addResults[0]);
        }
      });
    });

    return false;
  },
  getAllBeacons: function(successCallback) {
    var queryParams = {
      f: 'json',
      returnGeometry: true,
      where: '1=1',
      outSR: '4326'
    };

    featureServer.queryFeatures(queryParams, function(features) {
      successCallback(_.map(features, beaconFeatureConverter.featureToBeacon));
    });
  },
  getBeaconById: function(id, successCallback) {
    var queryParams = {
      f: 'json',
      returnGeometry: true,
      where: '1=1',
      outSR: '4326',
      objectIds: id
    };

    featureServer.queryFeatures(queryParams, function(features) {
      successCallback(beaconFeatureConverter.featureToBeacon(features[0]));
    });
  }
};