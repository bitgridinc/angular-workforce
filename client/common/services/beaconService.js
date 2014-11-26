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
      beaconData.id = idCounter++;
      this.beacons.push(beaconData);
    }
  }
});