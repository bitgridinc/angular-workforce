"use strict";

describe('the beacon list controller', function() {
  var $scope,
      $rootScope,
      userNavigationService,
      $controller;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function(_$rootScope_, _UserNavigationService_, _$controller_) {
    $scope = _$rootScope_.$new();
    userNavigationService = _UserNavigationService_;
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
      UserNavigationService: userNavigationService
    });

    // Assert
    expect($scope.beacons).toBe($rootScope.dataFromServer.beacons);
  });
});
