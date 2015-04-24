"use strict";

describe('the beacon list controller', function() {
  var service;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function($rootScope, _BeaconVisibilityService_) {
    var currentEntity = {
      name: 'Tupper Lake',
      id: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
    };
    $rootScope.dataFromServer = {
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

    service = _BeaconVisibilityService_;
  }));

  // TODO: "and finalized"
  it('should filter sender\'s unanswered beacons', function() {
    // Arrange
    var beacons = [
      { // Should be filtered out
        senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84',
        responses: []
      },
      { // Should remain because it has a response
        senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84',
        responses: [{}]
      },
      { // Should be filtered out because it has an accepted response
        senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84',
        responses: [{}],
        acceptedAssistance: {}
      }
    ];

    // Act
    var filteredBeacons = service.filterBeacons(beacons);

    // Assert
    expect(filteredBeacons).toEqual([beacons[1]]);
  });
});
