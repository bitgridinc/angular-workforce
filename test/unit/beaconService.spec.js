"use strict";

describe('beaconService', function() {
  var beaconService;

  beforeEach(module('services.beacon'));

  beforeEach(inject(function(_BeaconService_) {
    beaconService = _BeaconService_;
  }));

  it('should be defined in Angular', function() {
    expect(beaconService).toBeDefined();
  });
  it('should define an array of beacons', function() {
    expect(beaconService.markers).toBeDefined();
  });
  it('should define a method to create a new beacon', function() {
    expect(beaconService.createBeacon).toBeDefined();
  });

  describe('createBeacon', function() {
    it('should add created beacons to the array of beacons', function() {
      var beaconData = {};
      expect(beaconService.markers.length).toBe(0);
      beaconService.createBeacon(beaconData);
      expect(beaconService.markers.length).toBe(1);
      expect(beaconService.markers[0]).toBe(beaconData);
    });
  });
});
