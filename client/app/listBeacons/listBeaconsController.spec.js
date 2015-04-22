"use strict";

describe('the beacon list controller', function() {
  var $scope,
      $rootScope,
      $controller;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();
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
      $scope: $scope
    });

    // Assert
    expect($scope.beacons).toBe($rootScope.dataFromServer.beacons);
  });
});
