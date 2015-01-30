"use strict";

describe('the new beacon creation factory', function() {
  var rootScope,
      scope,
      factory,
      restService;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function ($rootScope, _NewBeaconFactory_, RestService) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    factory = _NewBeaconFactory_;
    restService = RestService;
  }));
  beforeEach(function () {
    spyOn(scope, '$on');
    factory.initScope(scope);
  });

  it ('should configure scope with the default values for a new project', function () {
    expect(scope.title).toBeDefined();
    expect(scope.description).toBeDefined();
    expect(scope.lat).toBeDefined();
    expect(scope.lng).toBeDefined();
  });
  it ('should set up a watch to be notified when the user clicks on the map', function () {
    expect(scope.$on).toHaveBeenCalledWith('leafletDirectiveMap.click', factory.onMapClicked);
  });

  describe ('after the scope values are changed', function () {
    var newTitle = 'New Title',
        newDescription = 'New Description',
        newLatitude = 1,
        newLongitude = 2;

    beforeEach(function () {
      scope.title = newTitle;
      scope.description = newDescription;
      scope.lat = newLatitude;
      scope.lng = newLongitude;
    });

    describe ('the method to post a new beacon', function () {
      var expectedPost = {
        title: newTitle,
        description: newDescription,
        lat: newLatitude,
        lng: newLongitude,
        senderId: '1',
        recipientIds: []
      };

      it ('should pass the new beacon POST to the socket', function () {
        // Arrange
        spyOn(restService, 'createBeacon');
        rootScope.socketState = {
          currentEntity: {
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