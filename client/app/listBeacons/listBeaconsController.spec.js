"use strict";

describe('the beacon list controller', function() {
  var $scope,
      $rootScope,
      $state,
      $controller;

  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function(_$rootScope_, _$state_, _$controller_) {
    $scope = _$rootScope_.$new();
    $state = _$state_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  it('should tie the list of beacons from $rootScope into the $scope for display by the view', function() {
    // Arrange
    $rootScope.socketState = {
      beacons: []
    };

    // Act
    $controller('ListBeaconsController', {
      $rootScope: $rootScope,
      $scope: $scope,
      $state: $state
    });

    // Assert
    expect($scope.beacons).toBe($rootScope.socketState.beacons);
  });
});
