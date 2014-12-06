"use strict";

describe('beaconService', function() {
  var beaconService,
      STARTING_BEACON_COUNT = 1;

  beforeEach(module('modules.services'));

  beforeEach(inject(function(_BeaconService_) {
    beaconService = _BeaconService_;
  }));

  it('should be defined in Angular', function() {
    expect(beaconService).toBeDefined();
  });
  it('should define an array of beacons', function() {
    expect(beaconService.beacons.length).toBe(STARTING_BEACON_COUNT);
  });

  describe('the method to get a beacon by id', function() {
    it('should return undefined when this service is instantiated', function() {
      expect(beaconService.getBeacon(0)).toBeUndefined();
    });
  });

  describe('the method used to create a beacon', function() {
    var beacon = {};

    beforeEach(function() {
      beaconService.createBeacon({});
    });

    it('should add created beacons to the array of beacons', function() {
      expect(beaconService.beacons.length).toBe(STARTING_BEACON_COUNT + 1);
    });
    it('should create an id property with a positive integer value on the created beacon', function() {
      expect(beaconService.beacons[STARTING_BEACON_COUNT].id).toBeGreaterThan(-1);
    });
    it('should create a unique id property on subsequent creates', function() {
      beaconService.createBeacon({});
      expect(beaconService.beacons[STARTING_BEACON_COUNT].id).not.toBe(beaconService.beacons[STARTING_BEACON_COUNT + 1].id);
    });
    it('should allow for associating responses to the beacon', function() {
      expect(beaconService.beacons[STARTING_BEACON_COUNT].responses).toEqual([]);
    });
    it('should not reuse the same object (i.e., it should make a copy)', function() {
      var beacon = {};
      beaconService.createBeacon(beacon);
      expect(beaconService.beacons[STARTING_BEACON_COUNT + 1]).not.toBe(beacon);
    });
  });

  describe('the method used to offer assistance to a beacon', function() {
    it('should add assistance offer to beacons', function() {
      beaconService.createBeacon({});
      expect(beaconService.beacons[0].responses.length).toBe(0);
      beaconService.offerAssistance(beaconService.beacons[0], {});
      expect(beaconService.beacons[0].responses.length).toBe(1);
    });
    it('should not reuse the same object (i.e., it should make a copy)', function() {
      var beacon = {};
      var response = {};
      beaconService.createBeacon(beacon);
      beaconService.offerAssistance(beaconService.beacons[0], response);
      expect(beaconService.beacons[0].responses[0]).not.toBe(response);
    });
  });

  describe('the method used to accept assistance to a beacon', function() {
    it('should add accepted offer of assistance to beacon', function() {
      var offerToAccept = {};
      beaconService.createBeacon({});
      beaconService.acceptAssistance(beaconService.beacons[0], offerToAccept);
      expect(beaconService.beacons[0].acceptedAssistance).toEqual(offerToAccept);
    });
    it('should not reuse the same object (i.e., it should make a copy)', function() {
      var offerToAccept = {};
      beaconService.createBeacon({});
      beaconService.acceptAssistance(beaconService.beacons[0], offerToAccept);
      expect(beaconService.beacons[0].acceptedAssistance).not.toBe(offerToAccept);
    });
  });
});
