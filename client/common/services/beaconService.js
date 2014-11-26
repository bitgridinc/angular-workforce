"use strict";

var app = require('./_module_init.js');

app.service('BeaconService', function() {
  return {
    beacons: [],
    createBeacon: function(beaconData) {
      this.beacons.push(beaconData);
    }
  }
});