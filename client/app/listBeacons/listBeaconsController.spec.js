"use strict";

describe('the beacon list controller', function() {
  var $scope,
      $rootScope,
      state,
      $controller;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function(_$rootScope_, _state_, _$controller_) {
    $scope = _$rootScope_.$new();
    state = _state_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  it('should tie the list of beacons from $rootScope into the $scope for display by the view', function() {
    // Arrange
    $rootScope.dataFromServer = {
      beacons: []
    };

    // Act
    $controller('ListBeaconsController', {
      $rootScope: $rootScope,
      $scope: $scope,
      state: state
    });

    // Assert
    expect($scope.beacons).toBe($rootScope.dataFromServer.beacons);
  });
});
