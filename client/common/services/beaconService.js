"use strict";

var app = require('./_module_init.js');

app.service('BeaconService', function() {
  return {
    markers: [],
    createBeacon: function(beaconData) {
      this.markers.push(beaconData);
    }
  }
});