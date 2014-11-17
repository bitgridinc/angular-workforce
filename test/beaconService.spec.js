"use strict";

describe("beaconService", function() {
  var beaconService;

  beforeEach(module("app.services"));

  beforeEach(inject(function(_beaconService_) {
    beaconService = _beaconService_;
  }));

  describe('createBeacon', function() {
    it('should return the first argument if it has lat, lng, and org as properties', function() {
      var expected = {
        lat: 0,
        lng: 0,
        org: "org"
      };
      expect(beaconService.createBeacon(expected)).toEqual(expected);
      // TODO: Flesh this out when we decide on the api for the backend
    });
    it('should throw an error if lat is missing', function() {
      var beaconData = {
        lng: 0,
        org: "org"
      };
      expect(function() { beaconService.createBeacon(beaconData) }).toThrowError();
    });
    it('should throw an error if lng is missing', function() {
      var beaconData = {
        lat: 0,
        org: "org"
      };
      expect(function() { beaconService.createBeacon(beaconData) }).toThrowError();
    });
    it('should throw an error if org is missing', function() {
      var beaconData = {
        lat: 0,
        lng: 0
      };
      expect(function() { beaconService.createBeacon(beaconData) }).toThrowError();
    });
  });
});
