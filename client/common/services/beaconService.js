"use strict";

angular.module('services.beacon', [])
  .service('BeaconService', function() {
    return {
      markers: [],
      createBeacon: function(beaconData) {
        this.markers.push(beaconData);
      }
    }
  });