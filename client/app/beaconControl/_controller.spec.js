"use strict";

describe('the controller for the My Beacons button', function() {
  var $scope
    , $rootScope
    , $state
    , navigationService
    , $controller;

  function initializeController() {
    $controller('BeaconControlController', {
      $scope: $scope,
      $state: $state,
      NavigationService: navigationService
    });
  }

  beforeEach(module('modules.beaconControl'));
  beforeEach(inject(function(_$rootScope_, _$state_, _NavigationService_, _$controller_) {
    $scope = _$rootScope_.$new();
    $state = _$state_;
    navigationService = _NavigationService_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  it('should maintain a scope\'d variable that corresponds to whether the My Beacons button is open or closed', function() {
    // Arrange - configure $state to return that the My Beacons button is supposed to be open
    spyOn($state, 'includes').and.returnValue(true);

    // Act
    initializeController();

    // Assert
    expect($scope.isToggled).toBeTruthy();
  });
  it('should maintain a scope\'d variable that corresponds to whether the My Beacons button is open or closed', function() {
    // Arrange - configure $state to return that the My Beacons button is supposed to be closed
    spyOn($state, 'includes').and.returnValue(false);

    // Act
    initializeController();

    // Assert
    expect($scope.isToggled).toBeFalsy();
  });

  describe('once the controller is initialized', function() {
    var spied;

    beforeEach(function() {
      spied = spyOn($state, 'includes');
      spied.and.returnValue(false);
      initializeController();
    });

    it('should maintain a scope\'d variable that corresponds to whether the My Beacons button is open or closed', function() {
      // Arrange
      spyOn(navigationService, 'navigateTo');

      // Act
      $scope.toggleMyBeaconsButton();

      // Assert
      expect($scope.isToggled).toBeTruthy();

      // Arrange
      spied.and.returnValue(true);

      // Act
      $scope.toggleMyBeaconsButton();

      // Assert
      expect($scope.isToggled).toBeFalsy();
    });
  });
});
