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

  describe('the method to get a beacon by id', function() {
    it('should be defined', function() {
      expect(beaconService.getBeacon).toBeDefined();
    });
    it('should return undefined when this service is instantiated', function() {
      expect(beaconService.getBeacon(0)).toBeUndefined();
    });
  });

  describe('the method used to create a beacon', function() {
    it('should be defined', function() {
      expect(beaconService.createBeacon).toBeDefined();
    });
    it('should add created beacons to the array of beacons', function() {
      var beaconData = {};
      expect(beaconService.beacons.length).toBe(0);
      beaconService.createBeacon(beaconData);
      expect(beaconService.beacons.length).toBe(1);
      expect(beaconService.beacons[0]).toBe(beaconData);
    });
    it('should create an id property with a positive integer value on the created beacon', function() {
      beaconService.createBeacon({});
      expect(beaconService.beacons[0].id).toBeGreaterThan(-1);
    });
    it('should create a unique id property on subsequent creates', function() {
      beaconService.createBeacon({});
      beaconService.createBeacon({});
      expect(beaconService.beacons[0].id).not.toBe(beaconService.beacons[1].id);
    });
    it('should allow for associating responses to the beacon', function() {
      beaconService.createBeacon({});
      expect(beaconService.beacons[0].responses).toEqual([]);
    });
  });
});
