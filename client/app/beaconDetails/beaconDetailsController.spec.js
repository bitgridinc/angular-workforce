"use strict";

describe('the beacon details controller', function() {
  var $scope,
      $rootScope,
      userNavigationService;

  beforeEach(module('modules.beaconDetails'));
  beforeEach(inject(function(_$rootScope_, _UserNavigationService_, _$controller_) {
    $scope = _$rootScope_.$new();
    userNavigationService = _UserNavigationService_;
    $rootScope = _$rootScope_;

    _$controller_('BeaconDetailsController', {
      $scope: $scope,
      $rootScope: $rootScope
    });

    // This is the basic state required by the SUT (system under test)
    $rootScope.dataFromServer = {
      beacons: []
    };
  }));

  it('should update $rootScope with the corresponding beacon once it has been received from the server', function() {
    // Arrange
    $rootScope.findBeaconById = function() { return { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' }; };
    $rootScope.$stateParams = { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' };

    // Act
    $rootScope.$apply();

    // Assert
    expect($rootScope.selectionState.currentBeacon).toBeDefined();
  });
  it('should do nothing when the currently selected beacon does not match any beacons yet received from the server', function() {
    // Arrange
    $rootScope.findBeaconById = function() { return undefined; };
    $rootScope.$stateParams = { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' };

    // Act
    $rootScope.$apply();

    // Assert
    expect($rootScope.selectionState.currentBeacon).toBeUndefined();
  });
});
