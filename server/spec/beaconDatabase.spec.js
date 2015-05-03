"use strict";

var db = require('../esri/beaconDatabase/beaconDatabase');

describe('the beacon storage', function() {
  describe('when the AFGH environment is true', function() {
    beforeEach(function() {
      // Arrange the environment to use our hardcoded data instead of hitting ArcGIS Online
      process.env.AFGH = true;
    });

    it('should have 1 hardcoded beacon', function() {
      // Act by getting the array of beacons (there should be 1)
      var beacons = db.getAllBeacons();

      // Assert that there is only 1 beacon
      expect(beacons.length).toBe(1);
    });
    it('should have a beacon from Murfreesboro', function() {
      // Act by getting the first beacon
      var firstBeacon = db.getAllBeacons()[0];

      // Assert that it contains the data required by our AATs
      expect(firstBeacon.id).toEqual(30);
      expect(firstBeacon.senderId).toEqual('7a95759f-3df8-4f16-bb43-24f4329fe3df');
      expect(firstBeacon.title).toEqual('Murfreesboro Title');
      expect(firstBeacon.description).toEqual('Murfreesboro Description');
      expect(firstBeacon.streetAddress).toEqual('1563 N Thompson Ln');
      expect(firstBeacon.numberOfPeople).toEqual('4');
      expect(firstBeacon.lat).toBeDefined();
      expect(firstBeacon.lng).toBeDefined();
    });
  });
});
