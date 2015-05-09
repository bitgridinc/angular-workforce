"use strict";

describe('the create beacon controller', function() {
  var $scope
    , $rootScope
    , factory;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _NewBeaconFactory_) {
    factory = _NewBeaconFactory_;

    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;

    // This is the basic state required by the SUT (system under test)
    var currentOrganization = {
      name: 'Murfreesboro Electric Department',
      id: '7a95759f-3df8-4f16-bb43-24f4329fe3df'
    };
    $rootScope.dataFromServer = {
      allOrganizations: [
        currentOrganization,
        {
          name: 'Morristown Utility Systems',
          id: '323f8a60-37c6-4d97-a2f8-331c2231e92b'
        }
      ],
      currentOrganization: currentOrganization,
      beacons: []
    };

    _$controller_('CreateBeaconController', {
      $scope: $scope,
      $rootScope: $rootScope,
      NewBeaconFactory: _NewBeaconFactory_
    });
  }));

  it('should populate the list of available recipients', function() {
    // The current organization should be filtered out of this list
    expect($scope.possibleRecipients.length).toBe($rootScope.dataFromServer.allOrganizations.length - 1);
  });
  it('should error when no recipients are selected', function() {
    $scope.possibleRecipients[0].include = false;
    expect(function() { return $scope.completeNewBeacon(true); }).toThrowError();
  });
});