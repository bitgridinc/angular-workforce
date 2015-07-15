"use strict";

describe('the new beacon creation factory', function() {
  var rootScope
    , scope
    , factory
    , restService
    , fluentSharedLibraryService;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function ($rootScope, _NewBeaconFactory_, RestService, _FluentSharedLibrariesService_) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    factory = _NewBeaconFactory_;
    restService = RestService;
    fluentSharedLibraryService = _FluentSharedLibrariesService_;
  }));
  beforeEach(function () {
    factory.initScope(scope);
  });

  it ('should configure scope with the default values for a new project', function () {
    expect(scope.beaconData).toBeDefined();
  });

  describe ('after the scope values are changed', function () {
    var newTitle = 'New Title',
        newDescription = 'New Description',
        newStreetAddress = '2729 Merrilee Dr',
        newZip = '22031',
        newNumberOfPeople = 4;

    beforeEach(function () {
      scope.beaconData.title = newTitle;
      scope.beaconData.description = newDescription;
      scope.beaconData.streetAddress = newStreetAddress;
      scope.beaconData.zip = newZip;
      scope.beaconData.numberOfPeople = newNumberOfPeople;
    });

    describe ('the method to post a new beacon', function () {
      var expectedPost;

      beforeEach(function() {
        expectedPost = fluentSharedLibraryService.newBeaconPostFactory()
          .withRequired('1', newTitle, newDescription, 37, -76)
          .withAddress(newStreetAddress)
          .withNumberOfPeople(newNumberOfPeople)
          .createBeaconPost();
      });
      beforeEach(function() {
        spyOn(restService, 'createBeacon').and.returnValue({
          then: function() {}
        });
      });

      it('should create a new beacon POST message and POST it to the socket', function() {
        // Arrange
        rootScope.dataFromServer = {
          currentOrganization: {
            id: '1'
          }
        };

        // Act
        factory.postNewBeacon();

        // Assert
        expect(restService.createBeacon).toHaveBeenCalledWith(expectedPost);
      });
    });
  });
});