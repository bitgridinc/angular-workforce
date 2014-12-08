"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');
var app = require('./_module_init.js');

app.service('BeaconService', function() {
  var idCounter = 0;

  var service = {
    beacons: [],
    getBeacon: function(id) {
      return _.find(this.beacons, function(beacon) {
        return beacon.id === id;
      });
    },
    createBeacon: function(beaconData) {
      var newBeacon = angular.copy(beaconData);
      newBeacon.id = idCounter++;
      newBeacon.responses = [];
      newBeacon.acceptedAssistance = undefined;
      this.beacons.push(newBeacon);
    },
    offerAssistance: function(beacon, offeredAssistance) {
      beacon.responses.push(angular.copy(offeredAssistance));
    },
    acceptAssistance: function(beacon, acceptedAssistance) {
      beacon.acceptedAssistance = angular.copy(acceptedAssistance);
    }
  };

  service.createBeacon({
    title: 'Test Title',
    description: 'Test Description',
    organization: 'Test Company',
    lat: 38.91,
    lng: -77.02
  });

  return service;
});