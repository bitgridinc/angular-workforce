"use strict";

angular.module('app.services', [])
  .service('BeaconService', function() {
    return {
      markers: [],
      createBeacon: function(beaconData) {
        this.markers.push(beaconData);
      }
    }
  });