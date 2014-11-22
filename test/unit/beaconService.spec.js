"use strict";

describe('beaconService', function() {
  var beaconService;

  beforeEach(module('services.beacon'));

  beforeEach(inject(function(_BeaconService_) {
    beaconService = _BeaconService_;
  }));

  it('should be defined as BeaconService', function() {
    expect(beaconService.markers).toBeDefined();
  });
  it('should define a markers array', function() {
    expect(beaconService.markers).toBeDefined();
  });
  it('should define a createBeacon method', function() {
    expect(beaconService.createBeacon).toBeDefined();
  });

  describe('createBeacon', function() {
    it('should add beaconData to markers', function() {
      var beaconData = {};
      expect(beaconService.markers.length).toBe(0);
      beaconService.createBeacon(beaconData);
      expect(beaconService.markers.length).toBe(1);
      expect(beaconService.markers[0]).toBe(beaconData);
    });
  });
});
