"use strict";

var db = require('../esri/beaconDatabase/beaconDatabase');

function expectMurfreesboroBeacon(beacon) {
  expect(beacon.id).toEqual(30);
  expect(beacon.senderId).toEqual('7a95759f-3df8-4f16-bb43-24f4329fe3df');
  expect(beacon.title).toEqual('Murfreesboro Title');
  expect(beacon.description).toEqual('Murfreesboro Description');
  expect(beacon.streetAddress).toEqual('1563 N Thompson Ln');
  expect(beacon.numberOfPeople).toEqual('4');
  expect(beacon.lat).toBeDefined();
  expect(beacon.lng).toBeDefined();
}

describe('the beacon storage', function() {
  describe('when the aat environment is true', function() {
    beforeEach(function() {
      // Arrange the environment to use our hardcoded data instead of hitting ArcGIS Online
      process.env.aat = true;
    });

    describe('the getAllBeacons function', function() {
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
          // Assert that it contains the data required by our AATs
          expectMurfreesboroBeacon(beacons[0]);
        };

        // Act by getting the first beacon
        db.getAllBeacons(callback);
      });
    });

    describe('the getBeaconById function', function() {
      it('should call the callback', function() {
        // Arrange a callback that knows if it is called
        var callbackCalled = false;
        var callback = function() {
          callbackCalled = true;
        };

        // Act by passing the callback
        db.getBeaconById(0, callback);

        // Assert that the callback was called
        expect(callbackCalled).toBeTruthy();
      });
      it('should return the Murfreesboro beacon always', function() {
        // Arrange the callback
        var callback = function(beacon) {
          // Assert that it contains the data required by our AATs
          expectMurfreesboroBeacon(beacon);
        };

        // Act by getting the first beacon with some arbitrary (and incorrect) id
        db.getBeaconById(-593457, callback);
      });
    });
  });
});
