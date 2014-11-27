"use strict";

describe('the service that shares UI state of the dashboard between controllers', function() {
  var dashboardUiState;

  beforeEach(module('modules.services'));

  beforeEach(inject(function(_DashboardUiState_) {
    dashboardUiState = _DashboardUiState_;
  }));

  it('should be defined in Angular', function() {
    expect(dashboardUiState).toBeDefined();
  });

  describe('the flag for whether the My Company button has been toggled', function() {
    it('should be defined', function() {
      expect(dashboardUiState.isMyCompanyButtonToggled).toBeDefined();
    });
    it('should default so that the My Company view is open for faster testing', function() {
      expect(dashboardUiState.isMyCompanyButtonToggled).toBeTruthy();
    });
  });

  describe('the flag for whether the user is creating a new beacon', function() {
    it('should be defined', function() {
      expect(dashboardUiState.isCreatingBeacon).toBeDefined();
    });
    it('should default so that the beacon creation view is open for faster testing', function() {
      expect(dashboardUiState.isCreatingBeacon).toBeTruthy();
    });
  });

  describe('the flag for whether the user is offering assistance', function() {
    it('should be defined', function() {
      expect(dashboardUiState.isOfferingAssistance).toBeDefined();
    });
    it('should default so that the user is not offering assistance', function() {
      expect(dashboardUiState.isOfferingAssistance).toBeFalsy();
    });
  });

  describe('the flag for whether the user is reviewing offers of assistance', function() {
    it('should be defined', function() {
      expect(dashboardUiState.isReviewingOfferOfAssistance).toBeDefined();
    });
    it('should default so that the user is not reviewing offers of assistance', function() {
      expect(dashboardUiState.isReviewingOfferOfAssistance).toBeFalsy();
    });
  });
});
