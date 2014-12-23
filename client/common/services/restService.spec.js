"use strict";

describe('the REST service', function() {
  /*var rootScope,
      service,
      STARTING_BEACON_COUNT = 1;

  beforeEach(module('modules.services'));

  beforeEach(inject(function($rootScope, _RestService_) {
    rootScope = $rootScope;
    service = _RestService_;
  }));

  it('should be defined in Angular', function() {
    expect(service).toBeDefined();
  });
  it('should define an array of beacons', function() {
    expect(service.beacons.length).toBe(STARTING_BEACON_COUNT);
  });

  describe('the method to get a beacon by id', function() {
    it('should return a beacon by its id', function() {
      expect(service.getBeacon(0)).toBe(service.beacons[0]);
    });
    it('should return undefined for an invalid id', function() {
      expect(service.getBeacon(-1)).toBeUndefined();
    });
  });

  describe('the method used to create a beacon', function() {
    var beacon = {};

    beforeEach(function() {
      service.createBeacon({});
    });

    it('should add created beacons to the array of beacons', function() {
      expect(service.beacons.length).toBe(STARTING_BEACON_COUNT + 1);
    });
    it('should create an id property with a positive integer value on the created beacon', function() {
      expect(service.beacons[STARTING_BEACON_COUNT].id).toBeGreaterThan(-1);
    });
    it('should create a unique id property on subsequent creates', function() {
      service.createBeacon({});
      expect(service.beacons[STARTING_BEACON_COUNT].id).not.toBe(service.beacons[STARTING_BEACON_COUNT + 1].id);
    });
    it('should allow for associating responses to the beacon', function() {
      expect(service.beacons[STARTING_BEACON_COUNT].responses).toEqual([]);
    });
    it('should not reuse the same object (i.e., it should make a copy)', function() {
      var beacon = {};
      service.createBeacon(beacon);
      expect(service.beacons[STARTING_BEACON_COUNT + 1]).not.toBe(beacon);
    });
  });

  describe('the method used to offer assistance to a beacon', function() {
    beforeEach(function() {
      service.createBeacon({});
    });

    it('should add assistance offer to beacons', function() {
      expect(service.beacons[0].responses.length).toBe(0);
      service.offerAssistance(service.beacons[0], {});
      expect(service.beacons[0].responses.length).toBe(1);
    });
    it('should add the current organization to the response', function() {
      rootScope.organization = {};
      service.offerAssistance(service.beacons[0], {});
      expect(service.beacons[0].responses[0].organization).toBeDefined();
    });
    it('should not reuse the same object (i.e., it should make a copy)', function() {
      var response = {};
      service.offerAssistance(service.beacons[0], response);
      expect(service.beacons[0].responses[0]).not.toBe(response);
    });
  });

  describe('the method used to accept assistance to a beacon', function() {
    it('should add accepted offer of assistance to beacon', function() {
      var offerToAccept = {};
      service.createBeacon({});
      service.acceptAssistance(service.beacons[0], offerToAccept);
      expect(service.beacons[0].acceptedAssistance).toEqual(offerToAccept);
    });
    it('should not reuse the same object (i.e., it should make a copy)', function() {
      var offerToAccept = {};
      service.createBeacon({});
      service.acceptAssistance(service.beacons[0], offerToAccept);
      expect(service.beacons[0].acceptedAssistance).not.toBe(offerToAccept);
    });
  });*/
});
