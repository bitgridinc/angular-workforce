"use strict";

describe('the new beacon creation factory', function() {
  var scope,
      factory,
      restService;

  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function ($rootScope, _NewBeaconFactory_, RestService) {
    scope = $rootScope.$new();
    factory = _NewBeaconFactory_;
    restService = RestService;
  }));
  beforeEach(function () {
    spyOn(scope, '$on');
    factory.initScope(scope);
    spyOn(restService, 'createBeacon');
  });

  it ('should configure scope with the default values for a new project', function () {
    expect(scope.title).toBeDefined();
    expect(scope.description).toBeDefined();
    expect(scope.latitude).toBeDefined();
    expect(scope.longitude).toBeDefined();
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
      scope.latitude = newLatitude;
      scope.longitude = newLongitude;
    });

    describe ('the method to post a new beacon', function () {
      beforeEach(function () {
        factory.postNewBeacon();
      });

      it ('should pass the correct values', function () {
        expect(restService.createBeacon).toHaveBeenCalledWith({
          title: newTitle,
          description: newDescription,
          lat: newLatitude,
          lng: newLongitude
        });
      });
    });
  });
});