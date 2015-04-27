"use strict";

describe('the RequiresInput filter', function() {
  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function($rootScope) {
    var currentEntity = {
      name: 'Murfreesboro Electric Department',
      id: '7a95759f-3df8-4f16-bb43-24f4329fe3df'
    };
    $rootScope.dataFromServer = {
      allEntities: [
        currentEntity,
        {
          name: 'Morristown Utility Systems',
          id: '323f8a60-37c6-4d97-a2f8-331c2231e92b'
        }
      ],
      currentEntity: currentEntity
    };
  }));

  it('should filter sender\'s unanswered beacons', inject(function(requiresInputFilter) {
    // Arrange
    var beacons = [
      { // Should be filtered out
        senderId: '7a95759f-3df8-4f16-bb43-24f4329fe3df',
        responses: [],
        acceptedAssistance: []
      },
      { // Should remain because it has a response
        senderId: '7a95759f-3df8-4f16-bb43-24f4329fe3df',
        responses: [{}],
        acceptedAssistance: []
      },
      { // Should be filtered out because it has an accepted response
        senderId: '7a95759f-3df8-4f16-bb43-24f4329fe3df',
        responses: [{}],
        acceptedAssistance: [{}]
      }
    ];

    // Act
    var filteredBeacons = requiresInputFilter(beacons);

    // Assert
    expect(filteredBeacons).toEqual([beacons[1]]);
  }));
});
