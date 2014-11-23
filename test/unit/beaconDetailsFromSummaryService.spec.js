"use strict";

describe('the service that displays beacon details when a beacon summary is clicked', function() {
  var service;

  beforeEach(module('services.beaconDetailsFromSummary'));

  beforeEach(inject(function(_BeaconDetailsFromSummaryService_) {
    service = _BeaconDetailsFromSummaryService_;
  }));

  it('should be defined in Angular', function() {
    expect(service).toBeDefined();
  });

  describe('the property used to expose the currently displayed beacon', function() {
    it('should have a value of undefined when the service is initialized', function() {
      expect(service.currentBeacon).toBe(undefined);
    });
    it('should not allow its value to be set explicitly', function() {
      expect(service.__lookupSetter__('currentBeacon')).toBe(undefined);
    });
  });

  describe('the method used to tell the service to display details of a beacon', function() {
    it('should be defined', function() {
      expect(service.displayBeaconDetails).toBeDefined();
    });
    it('should store and expose the beacon passed to it', function() {
      var beacon = {};
      service.displayBeaconDetails(beacon);
      expect(service.currentBeacon).toBe(beacon);
    });
  });

  describe('the method used to tell the service to stop displaying beacon details', function() {
    it('should be defined', function() {
      expect(service.closeBeaconDetails).toBeDefined();
    });
    it('should set the currently displayed beacon to undefined when it is called', function() {
      var beacon = {};
      service.displayBeaconDetails(beacon);
      expect(service.currentBeacon).toBe(beacon);
      service.closeBeaconDetails();
      expect(service.currentBeacon).toBe(undefined);
    });
  });
});
