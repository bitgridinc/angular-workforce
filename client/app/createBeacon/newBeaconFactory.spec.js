"use strict";

describe('the new beacon creation factory', function() {
  var rootScope,
      scope,
      factory,
      restService,
      geocoder;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function ($rootScope, _NewBeaconFactory_, RestService, _geocoder_) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    factory = _NewBeaconFactory_;
    restService = RestService;
    geocoder = _geocoder_;
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
        newCity = 'Fairfax';

    beforeEach(function () {
      scope.beaconData.title = newTitle;
      scope.beaconData.description = newDescription;
      scope.beaconData.streetAddress = newStreetAddress;
      scope.beaconData.city = newCity;
    });

    describe ('the method to post a new beacon', function () {
      var expectedPost = {
        title: newTitle,
        description: newDescription,
        lat: 1,
        lng: 2,
        senderId: '1',
        recipientIds: []
      };

      it('should lookup the street address and city with the geocoder and then pass the new beacon POST to the socket', function() {
        // Arrange
        rootScope.socketState = {
          currentEntity: {
            id: '1'
          }
        };
        spyOn(geocoder, 'geocodeAddress').and.returnValue({
          then: function(thenFunc) {
            thenFunc({
              lat: expectedPost.lat,
              lng: expectedPost.lng
            });
          }
        });
        spyOn(restService, 'createBeacon');

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoder.geocodeAddress).toHaveBeenCalledWith(newStreetAddress, newCity);
        expect(restService.createBeacon).toHaveBeenCalledWith(expectedPost);
      });

      it('should fail if the title is undefined', function() {
        // Arrange
        scope.beaconData.title = undefined;

        // Act/Assert
        expect(function() {
          factory.postNewBeacon();
        }).toThrowError();
      });
      it('should fail if the description is undefined', function() {
        // Arrange
        scope.beaconData.description = undefined;

        // Act/Assert
        expect(function() {
          factory.postNewBeacon();
        }).toThrowError();
      });
      it('should fail if the street address is undefined', function() {
        // Arrange
        scope.beaconData.streetAddress = undefined;

        // Act/Assert
        expect(function() {
          factory.postNewBeacon();
        }).toThrowError();
      });
      it('should fail if the city is undefined', function() {
        // Arrange
        scope.beaconData.city = undefined;

        // Act/Assert
        expect(function() {
          factory.postNewBeacon();
        }).toThrowError();
      });
    });
  });
});