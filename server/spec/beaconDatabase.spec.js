"use strict";

var db = require('../esri/beaconDatabase/beaconDatabase');

describe('the beacon storage', function() {
  describe('when the aat environment is true', function() {
    beforeEach(function() {
      // Arrange the environment to use our hardcoded data instead of hitting ArcGIS Online
      process.env.aat = true;
    });

    it('should call the callback', function() {
      // Arrange a callback that knows if it is called
      var callbackCalled = false;
      var callback = function() {
        callbackCalled = true;
      };

      // Act by passing the callback
      db.getAllBeacons(callback);

      // Assert that the callback was called
      expect(callbackCalled).toBeTruthy();
    });
    it('should have 1 hardcoded beacon', function() {
      // Arrange the callback
      var callback = function(beacons) {
        // Assert that there is only 1 beacon
        expect(beacons.length).toBe(1);
      };

      // Act by getting the array of beacons (there should be 1)
      db.getAllBeacons(callback);
    });
    it('should have a beacon from Murfreesboro', function() {
      // Arrange the callback
      var callback = function(beacons) {
        var firstBeacon = beacons[0];

        // Assert that it contains the data required by our AATs
        expect(firstBeacon.id).toEqual(30);
        expect(firstBeacon.senderId).toEqual('7a95759f-3df8-4f16-bb43-24f4329fe3df');
        expect(firstBeacon.title).toEqual('Murfreesboro Title');
        expect(firstBeacon.description).toEqual('Murfreesboro Description');
        expect(firstBeacon.streetAddress).toEqual('1563 N Thompson Ln');
        expect(firstBeacon.numberOfPeople).toEqual('4');
        expect(firstBeacon.lat).toBeDefined();
        expect(firstBeacon.lng).toBeDefined();
      };

      // Act by getting the first beacon
      db.getAllBeacons(callback);
    });
  });
});
