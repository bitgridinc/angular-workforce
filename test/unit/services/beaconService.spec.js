"use strict";

describe('beaconService', function() {
  var beaconService;

  beforeEach(module('modules.services'));

  beforeEach(inject(function(_BeaconService_) {
    beaconService = _BeaconService_;
  }));

  it('should be defined in Angular', function() {
    expect(beaconService).toBeDefined();
  });
  it('should define an array of beacons', function() {
    expect(beaconService.beacons).toBeDefined();
  });
  it('should define a method to create a new beacon', function() {
    expect(beaconService.createBeacon).toBeDefined();
  });

  describe('createBeacon', function() {
    it('should add created beacons to the array of beacons', function() {
      var beaconData = {};
      expect(beaconService.beacons.length).toBe(0);
      beaconService.createBeacon(beaconData);
      expect(beaconService.beacons.length).toBe(1);
      expect(beaconService.beacons[0]).toBe(beaconData);
    });
  });
});
