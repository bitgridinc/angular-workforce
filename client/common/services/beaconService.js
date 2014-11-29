"use strict";

var app = require('./_module_init.js');

app.service('BeaconService', function() {
  var idCounter = 0;
  return {
    beacons: [],
    getBeacon: function() {
      return undefined;
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
  }
});