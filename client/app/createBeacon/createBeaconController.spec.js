"use strict";

describe('the create beacon controller', function() {
  var $scope,
      $state,
      $rootScope,
      factory;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function (_$rootScope_, _$state_, _$controller_, _NewBeaconFactory_) {
    factory = _NewBeaconFactory_;

    $scope = _$rootScope_.$new();
    $state = _$state_;
    $rootScope = _$rootScope_;

    // This is the basic state required by the SUT (system under test)
    var currentEntity = {
      name: 'Tupper Lake',
      id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
    };
    $rootScope.socketState = {
      allEntities: [
        currentEntity,
        {
          name: 'Silver Springs',
          id: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69'
        }
      ],
      currentEntity: currentEntity,
      beacons: []
    };

    _$controller_('CreateBeaconController', {
      $scope: $scope,
      $rootScope: $rootScope,
      $state: $state,
      NewBeaconFactory: _NewBeaconFactory_
    });
  }));

  it('should populate the list of available recipients', function() {
    // The current entity should be filtered out of this list
    expect($scope.possibleRecipients.length).toBe($rootScope.socketState.allEntities.length - 1);
  });
  it('should error when no recipients are selected', function() {
    spyOn($state, 'go');
    $scope.possibleRecipients[0].include = false;
    expect(function() { return $scope.completeNewBeacon(true); }).toThrowError();
    expect($state.go).not.toHaveBeenCalled();
  });
});