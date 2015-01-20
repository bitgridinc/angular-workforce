"use strict";

describe('the beacon details controller', function() {
  var $scope,
      $rootScope,
      $state;

  beforeEach(module('modules.beaconDetails'));
  beforeEach(inject(function(_$rootScope_, _$state_, _$controller_) {
    $scope = _$rootScope_.$new();
    $state = _$state_;
    $rootScope = _$rootScope_;

    _$controller_('BeaconDetailsController', {
      $scope: $scope,
      $rootScope: $rootScope,
      $state: $state
    });

    // This is the basic state required by the SUT (system under test)
    $rootScope.socketState = {
      beacons: []
    };
  }));

  it('should update $rootScope with the corresponding beacon once it has been received from the server', function() {
    // Arrange
    $rootScope.socketState.beacons.push({ id: 'e688af0b-63df-48bc-941c-9cc5f750367b' });
    $rootScope.$stateParams = { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' };

    // Act
    $rootScope.$apply();

    // Assert
    expect($rootScope.selectionState.currentBeacon).toBeDefined();
  });
  it('should do nothing when the currently selected beacon does not match any beacons yet received from the server', function() {
    // Arrange
    $rootScope.socketState.beacons.push({ id: '99999999-9999-9999-9999-999999999999' });
    $rootScope.$stateParams = { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' };

    // Act
    $rootScope.$apply();

    // Assert
    expect($rootScope.selectionState.currentBeacon).toBeUndefined();
  });
});
