"use strict";

describe('the beacon list controller', function() {
  var service;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function(_BeaconVisibilityService_) {
    service = _BeaconVisibilityService_;
  }));

  it('should do nothing', function() {
    // Arrange
    var beacons = [
      {}
    ];

    // Act
    var filteredBeacons = service.filterBeacons(beacons);

    // Assert
    expect(filteredBeacons).toBe(beacons);
  });
});
