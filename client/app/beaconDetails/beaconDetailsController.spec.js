"use strict";

describe('the controller that handles the beacon details view', function() {
  var $scope,
      $rootScope;

  beforeEach(module('modules.beaconDetails'));
  beforeEach(inject(function(_$rootScope_, $state, _$controller_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;

    _$controller_('BeaconDetailsController', {
      $scope: $scope,
      $rootScope: $rootScope,
      $state: $state
    });
  }));

  it('should create an object on rootScope for passing the currently selected beacon', function() {
    expect($rootScope.selectionState).toBeDefined();
  })
});
