"use strict";

describe('the RequiresInput filter', function() {
  beforeEach(module('modules.providers'));
  beforeEach(module('modules.listBeacons'));
  beforeEach(inject(function($rootScope) {
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
      currentOrganization: currentOrganization
    };
  }));

  it('should filter sender\'s unanswered beacons', inject(function(requiresInputFilter) {
    // Arrange
    var beacons = [
      { // Should be filtered out
        senderId: 'yk7EooUDkOKQA9zj',
        responses: [],
        acceptedAssistance: []
      },
      { // Should remain because it has a response
        senderId: 'yk7EooUDkOKQA9zj',
        responses: [{}],
        acceptedAssistance: []
      },
      { // Should be filtered out because it has an accepted response
        senderId: 'yk7EooUDkOKQA9zj',
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
