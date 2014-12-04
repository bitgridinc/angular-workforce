"use strict";

describe('the service that shares UI state of the dashboard between controllers', function() {
  var dashboardUiState;
  var rootScope;

  beforeEach(module('modules.services'));

  beforeEach(inject(function($rootScope, _DashboardUiState_) {
    dashboardUiState = _DashboardUiState_;
    rootScope = $rootScope;
  }));

  it('should be defined in Angular', function() {
    expect(dashboardUiState).toBeDefined();
  });

  describe('the flag for whether the My Company button has been toggled', function() {
    it('should default so that the My Company view is closed', function() {
      expect(dashboardUiState.isMyCompanyButtonToggled).toBeFalsy();
    });
  });

  describe('the flag for whether the user is creating a new beacon', function() {
    it('should default so that the beacon creation view is closed', function() {
      expect(dashboardUiState.isCreatingBeacon).toBeFalsy();
    });
  });

  describe('the flag for whether the user is selecting services', function() {
    it('should default to false so that the beacon creation view is closed', function() {
      expect(dashboardUiState.isSelectingServices).toBeFalsy();
    });
  });

  describe('the flag for whether the user is offering assistance', function() {
    it('should default so that the user is not offering assistance', function() {
      expect(dashboardUiState.isOfferingAssistance).toBeFalsy();
    });
  });

  describe('the flag for whether the user is reviewing offers of assistance', function() {
    it('should default so that the user is not reviewing offers of assistance', function() {
      expect(dashboardUiState.isReviewingOfferOfAssistance).toBeFalsy();
    });
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
    it('should be defined', function() {
      expect(dashboardUiState.toggleBeaconSelection).toBeDefined();
    });
    it('should set the currently displayed beacon to undefined when it is called', function() {
      var beacon = {};
      dashboardUiState.toggleBeaconSelection(beacon);
      expect(dashboardUiState.currentlySelectedBeacon).toBe(beacon);
      dashboardUiState.toggleBeaconSelection(beacon);
      expect(dashboardUiState.currentlySelectedBeacon).toBe(undefined);
    });
    it('should broadcast a message when the currently displayed beacon changes', function() {
      spyOn(rootScope, '$broadcast');
      var beacon = {};
      dashboardUiState.toggleBeaconSelection(beacon);
      expect(rootScope.$broadcast).toHaveBeenCalledWith('currentBeaconChanged', beacon);
    });
  });
});
