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

  // Assert it contains a single response from Morristown
  expect(beacon.responses.length).toBe(1);
  var response = beacon.responses[0];
  expect(response.id).toBe('2cf8faaa-5760-41c9-adbf-5a4482ac3469');
  expect(response.senderId).toBe('323f8a60-37c6-4d97-a2f8-331c2231e92b');
  expect(response.beaconId).toBe(30);
  expect(response.numResponders).toBe('4');
  expect(response.arrivalDate.getFullYear()).toBe(2015);

  // Assert it contains no accepted offers of assistance
  expect(beacon.acceptedAssistance.length).toBe(0);
}

function expectNumberOfBeacons(number) {
  // Arrange the callback
  var callback = function(beacons) {
    // Assert that there is only {number} beacon
    expect(beacons.length).toBe(number);
  };

  // Act by getting the array of beacons (there should be {number})
  db.getAllBeacons(callback);
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
        expectNumberOfBeacons(1);
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

    describe('the saveBeacon function', function() {
      it('should add to the hardcoded list of beacons', function() {
        // Arrange a new beacon to add
        var beacon = {};

        // Act by passing the beacon
        db.saveBeacon(beacon);

        // Assert that there's a new beacon
        expectNumberOfBeacons(2);
      });
    });
  });
});
