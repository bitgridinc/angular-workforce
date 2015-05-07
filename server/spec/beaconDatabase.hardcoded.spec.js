"use strict";

var db = require('../esri/beaconDatabase/beaconDatabase')
  , _ = require('lodash');

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
      it('should have 2 hardcoded beacons', function() {
        // Arrange the callback
        var callback = function(beacons) {
          // Assert that there is only 2 beacons
          expect(beacons.length).toBe(2);
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
      it('should have a beacon from Morristown with no responses; this shouldn\'t show in the beacon list', function() {
        // Arrange the callback
        // Arrange the callback
        var callback = function(beacons) {
          // Assert that it contains the beacon in question
          var beacon = _.find(beacons, function(beacon) {
            return beacon.senderId === '323f8a60-37c6-4d97-a2f8-331c2231e92b' && beacon.responses.length === 0;
          });
          // Our AATs will be written against this specific id as it shows up in the URL
          expect(beacon.id).toBe(31);
        };

        // Act by getting the first beacon
        db.getAllBeacons(callback);
      });
    });

    describe('the getBeaconById function', function() {
      it('should call the callback if the correct id is specified', function() {
        // Arrange a callback that knows if it is called
        var callbackCalled = false;
        var callback = function() {
          callbackCalled = true;
        };

        // Act by passing the callback
        db.getBeaconById(30, callback);

        // Assert that the callback was called
        expect(callbackCalled).toBeTruthy();
      });
      it('should return the Murfreesboro beacon if the correct id is specified', function() {
        // Arrange the callback
        var callback = function(beacon) {
          // Assert that it contains the data required by our AATs
          expectMurfreesboroBeacon(beacon);
        };

        // Act by getting the beacon by the correct id
        db.getBeaconById(30, callback);
      });
      it('should not call the callback if an id is passed for a beacon that doesn\'t exist', function() {
        // Arrange the callback
        var callback = function() {
          throw new Error();
        };

        // Act by getting the beacon by the correct id
        db.getBeaconById(-5346, callback);
      });
    });

    describe('the saveBeacon function', function() {
      it('should call the callback', function() {
        // Arrange a callback that knows if it is called
        var callbackCalled = false;
        var callback = function() {
          callbackCalled = true;
        };

        // Act by passing the callback
        db.saveBeacon({}, callback);

        // Assert that the callback was called
        expect(callbackCalled).toBeTruthy();
      });
      it('should return a result object containing the objectId of the new beacon, which can then be used to retrieve it', function() {
        var callbackChainCompleted = false;

        // Arrange the callback to assert the result object
        var callback = function(result) {
          expect(result.objectId).toBeGreaterThan(0);

          // Act by getting the beacon by its id
          db.getBeaconById(result.objectId, function(beacon) {
            // Assert it is the correct beacon returned
            expect(beacon.id).toBe(result.objectId);
            callbackChainCompleted = true;
          });
        };

        // Act by saving the beacon
        db.saveBeacon({}, callback);

        // Assert that each callback was called
        expect(callbackChainCompleted).toBeTruthy();
      });
      it('should add to the hardcoded list of beacons', function() {
        // Arrange a new beacon to add and the callback to ensure there is more than 1
        var beacon = {};
        var getAllBeaconsCallback = function(beacons) {
          // Assert that there is more than one beacon, to prove that new ones can be added
          expect(beacons.length).toBeGreaterThan(1);
        };

        // Act by passing the beacon followed by getting the list of all beacons
        db.saveBeacon(beacon, function() {});
        db.getAllBeacons(getAllBeaconsCallback);
      });
    });
  });
});
