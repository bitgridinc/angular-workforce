"use strict";

describe('the service that monitors what a user has selected', function() {
  var service;

  beforeEach(module('modules.services'));

  beforeEach(inject(function(_UserSelectionService_) {
    service = _UserSelectionService_;
  }));

  it('should be defined in Angular', function() {
    expect(service).toBeDefined();
  });

  describe('the property used to expose the currently selected beacon', function() {
    it('should have a value of undefined when the service is initialized', function() {
      expect(service.currentlySelectedBeacon).toBe(undefined);
    });
    it('should not allow its value to be set explicitly', function() {
      expect(service.__lookupSetter__('currentlySelectedBeacon')).toBe(undefined);
    });
  });

  describe('the method called when the user toggles the selection of a beacon', function() {
    it('should be defined', function() {
      expect(service.toggleBeaconSelection).toBeDefined();
    });
    it('should set the currently displayed beacon to undefined when it is called', function() {
      var beacon = {};
      service.toggleBeaconSelection(beacon);
      expect(service.currentlySelectedBeacon).toBe(beacon);
      service.toggleBeaconSelection(beacon);
      expect(service.currentlySelectedBeacon).toBe(undefined);
    });
  });
});
