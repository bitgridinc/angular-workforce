"use strict";

describe('the controller for the root module', function() {
  var $rootScope;

  beforeEach(module('app'));
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;

    _$controller_('AppController', {
      $rootScope: $rootScope
    });
  }));

  it('should have initialized $rootScope with an object to store state from the socket', function() {
    expect($rootScope.dataFromServer.allOrganizations).toBeDefined();
    expect($rootScope.dataFromServer.currentOrganization).toBeDefined();
    expect($rootScope.dataFromServer.beacons).toBeDefined();
  });
  it('should expose a function on $rootScope to find an organization by id', function() {
    // Arrange
    $rootScope.dataFromServer.allOrganizations.push({ id: 1 });
    $rootScope.dataFromServer.allOrganizations.push({ id: 2 });
    $rootScope.dataFromServer.allOrganizations.push({ id: 3 });

    // Act
    var organization = $rootScope.findOrganizationById($rootScope.dataFromServer.allOrganizations[1].id);

    // Assert
    expect(organization).toBe($rootScope.dataFromServer.allOrganizations[1]);
  });
  it('should expose a function on $rootScope to find an beacon by id', function() {
    // Arrange
    $rootScope.dataFromServer.beacons.push({ id: 1 });
    $rootScope.dataFromServer.beacons.push({ id: 2 });
    $rootScope.dataFromServer.beacons.push({ id: 3 });

    // Act
    var beacon = $rootScope.findBeaconById($rootScope.dataFromServer.beacons[1].id);

    // Assert
    expect(beacon).toBe($rootScope.dataFromServer.beacons[1]);
  });
});
