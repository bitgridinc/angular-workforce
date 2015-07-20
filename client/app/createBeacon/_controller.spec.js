"use strict";

describe('the create beacon controller', function() {
  var $scope
    , $rootScope
    , newBeaconFactory
    , factory;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _NewBeaconFactory_) {
    factory = _NewBeaconFactory_;

    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    newBeaconFactory = _NewBeaconFactory_

    // This is the basic state required by the SUT (system under test)
    var currentOrganization = {
      name: 'Murfreesboro Electric Department',
      id: 'yk7EooUDkOKQA9zj'
    };
    $rootScope.dataFromServer = {
      allOrganizations: [
        currentOrganization,
        {
          name: 'Morristown Utility Systems',
          id: 'a9ZaRCDMCo0WWZO7'
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

    $rootScope.$apply();
  }));

  it('should populate the list of available recipients', function() {
    // The current organization should be filtered out of this list
    expect($scope.possibleRecipients.length).toBe($rootScope.dataFromServer.allOrganizations.length - 1);
  });
  it('should error when no recipients are selected', function() {
    $scope.possibleRecipients[0].include = false;
    expect(function() { return $scope.completeNewBeacon(true); }).toThrowError();
  });
  it('should navigate to the beacon list after the new beacon is POSTed', function() {
    // Arrange
    $rootScope.navigationService = {
      navigateTo: jasmine.createSpy('navigateTo')
    };
    spyOn(newBeaconFactory, 'postNewBeacon').and.returnValue({
      then: function(callback) {
        callback();
      }
    });

    // Act
    $scope.completeNewBeacon(true);

    // Assert
    expect($rootScope.navigationService.navigateTo).toHaveBeenCalledWith('^.list');
  });
});
