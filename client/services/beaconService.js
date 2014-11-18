angular.module('app.services', [])
  .service('beaconService', function() {
    return {
      createBeacon: function(beaconData) {
        if (!("lat" in beaconData) ||
            !("lng" in beaconData) ||
            !("org" in beaconData)) {
          // TODO: Look up Douglas Crockford's recommended approach to errors
          throw new Error("lat, lng, and org are required properties of beaconData");
        }

        return beaconData;
      }
    }
  });