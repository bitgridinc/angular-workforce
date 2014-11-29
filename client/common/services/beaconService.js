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
      newBeacon.acceptedOffer = undefined;
      this.beacons.push(newBeacon);
    },
    offerAssistance: function(beacon, assistanceOffer) {
      beacon.responses.push(angular.copy(assistanceOffer));
    },
    acceptAssistance: function(beacon, assistanceOffer) {
      beacon.acceptedOffer = angular.copy(assistanceOffer);
    }
  }
});