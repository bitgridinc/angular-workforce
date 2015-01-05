"use strict";

describe('the service that manages the beacon the user has selected', function() {
  var $rootScope,
      service;

  beforeEach(module('modules.beaconDetails'));
  beforeEach(inject(function (_$rootScope_, _SelectionService_) {
    $rootScope = _$rootScope_;
    service = _SelectionService_;
  }));

  it ('should update the currently selected beacon based on the selected beacon id', function () {
    $rootScope.socketState = {
      beacons: [
        {
          id: 'e688af0b-63df-48bc-941c-9cc5f750367b'
        }
      ]
    };

    expect($rootScope.selectionState.currentBeacon).not.toBeDefined();

    $rootScope.currentBeaconId = 'e688af0b-63df-48bc-941c-9cc5f750367b';

    // This is required to trigger the $watch methods
    $rootScope.$apply();

    expect($rootScope.selectionState.currentBeacon).toBeDefined();
  });
});
