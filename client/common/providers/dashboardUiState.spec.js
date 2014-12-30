"use strict";

describe('the service that shares UI state of the dashboard between controllers', function() {
  var dashboardUiState;
  var rootScope;

  beforeEach(module('modules.providers'));

  beforeEach(inject(function($rootScope, _DashboardUiState_) {
    dashboardUiState = _DashboardUiState_;
    rootScope = $rootScope;
  }));

  it('should be defined in Angular', function() {
    expect(dashboardUiState).toBeDefined();
  });

  describe('the property used to expose the currently selected beacon', function() {
    it('should have a value of undefined when the service is initialized', function() {
      expect(dashboardUiState.currentlySelectedBeacon).toBe(undefined);
    });
    it('should not allow its value to be set explicitly', function() {
      expect(dashboardUiState.__lookupSetter__('currentlySelectedBeacon')).toBe(undefined);
    });
  });

  describe('the method called when the user toggles the selection of a beacon', function() {
    it('should set the currently displayed beacon to undefined when it is called', function() {
      var beacon = {};
      dashboardUiState.focusBeaconId(beacon);
      expect(dashboardUiState.currentlySelectedBeacon).toBe(beacon);
      dashboardUiState.focusBeaconId(beacon);
      expect(dashboardUiState.currentlySelectedBeacon).toBe(undefined);
    });
  });
});
