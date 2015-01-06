"use strict";

describe('the controller that handles the beacon details view', function() {
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
  }));

  describe('after the application is initialized', function() {
    beforeEach(function() {
      $rootScope.socketState = {
        beacons: []
      };
    });

    it('should do nothing when the currently selected beacon changes but no beacons are received from the server', function() {
      // Arrange
      $rootScope.currentlySelectedBeaconId = 'e688af0b-63df-48bc-941c-9cc5f750367b';

      // Act
      $rootScope.$apply();

      // Assert
      expect($rootScope.selectionState.currentBeacon).toBeUndefined();
    });
    it('should do nothing when the currently selected beacon is set and an unrelated beacon is received from the server', function() {
      // Arrange
      $rootScope.socketState.beacons.push({ id: '99999999-9999-9999-9999-999999999999' });
      $rootScope.currentlySelectedBeaconId = 'e688af0b-63df-48bc-941c-9cc5f750367b';

      // Act
      $rootScope.$apply();

      // Assert
      expect($rootScope.selectionState.currentBeacon).toBeUndefined();
    });

    describe('after a beacon is selected', function() {
      beforeEach(function() {
        $rootScope.socketState.beacons.push({ id: 'e688af0b-63df-48bc-941c-9cc5f750367b' });
        $rootScope.currentlySelectedBeaconId = 'e688af0b-63df-48bc-941c-9cc5f750367b';
        $rootScope.$apply();
      });

      it('should add that beacon to the $rootScope for use throughout the beacons details view and its children', function() {
        expect($rootScope.selectionState.currentBeacon).toBeDefined();
      });
      it('should unset the current beacon if the user navigates out of the beacon details view (or its children)', function() {
        $rootScope.currentlySelectedBeaconId = undefined;

        $rootScope.$apply();

        expect($rootScope.selectionState.currentBeacon).toBeUndefined();
      });
      it('should unset the current beacon if the selected beacon is deleted', function() {
        $rootScope.socketState.beacons.pop();

        $rootScope.$apply();

        expect($rootScope.selectionState.currentBeacon).toBeUndefined();
      });
    });
  });
});
