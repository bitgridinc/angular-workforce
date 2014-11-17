angular.module('app.services', [])
  .service('beaconService', function() {
    return {
      createBeacon: function(beaconData) {
        return beaconData;
      }
    }
  });