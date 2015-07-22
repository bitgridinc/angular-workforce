"use strict";

describe('the create beacon controller', function() {
  var $scope
    , $rootScope
    , newBeaconFactory
    , factory
    , controller;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _NewBeaconFactory_) {
    factory = _NewBeaconFactory_;

    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    newBeaconFactory = _NewBeaconFactory_;

    controller = _$controller_('CreateBeaconController', {
      $scope: $scope,
      $rootScope: $rootScope,
      NewBeaconFactory: _NewBeaconFactory_
    });
  }));

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
