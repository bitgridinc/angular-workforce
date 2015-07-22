"use strict";

describe('the new beacon creation factory', function() {
  var $rootScope
    , sut;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function(_$rootScope_, _RecipientService_) {
    $rootScope = _$rootScope_;

    // This is the basic state required by the SUT (system under test)
    var currentOrganization = {
      id: 'yk7EooUDkOKQA9zj'
    };
    $rootScope.dataFromServer = {
      allOrganizations: [
        currentOrganization,
        {
          id: 'a9ZaRCDMCo0WWZO7'
        }
      ],
      currentOrganization: currentOrganization
    };

    sut = _RecipientService_;
  }));

  it('should populate the list of available recipients', function() {
    // Act
    $rootScope.$apply();

    // Assert
    // The current organization should be filtered out of this list
    expect(sut.possibleRecipients.length).toBe($rootScope.dataFromServer.allOrganizations.length - 1);
    expect(sut.possibleRecipients[0].organization.id).toBe($rootScope.dataFromServer.allOrganizations[1].id);
  });
});