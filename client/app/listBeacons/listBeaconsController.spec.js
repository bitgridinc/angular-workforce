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
      beacons: [
        { id: 'e688af0b-63df-48bc-941c-9cc5f750367b' },
        { id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e00' }
      ]
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
