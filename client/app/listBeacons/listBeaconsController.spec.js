"use strict";

describe('the beacon list controller', function() {
  var $scope,
      $rootScope,
      stateService,
      $controller;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function(_$rootScope_, _StateService_, _$controller_) {
    $scope = _$rootScope_.$new();
    stateService = _StateService_;
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
      StateService: stateService
    });

    // Assert
    expect($scope.beacons).toBe($rootScope.dataFromServer.beacons);
  });
});
