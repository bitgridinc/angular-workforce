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
        newCity = 'Fairfax',
        newNumberOfPeople = 4;

    beforeEach(function () {
      scope.beaconData.title = newTitle;
      scope.beaconData.description = newDescription;
      scope.beaconData.streetAddress = newStreetAddress;
      scope.beaconData.city = newCity;
      scope.beaconData.numberOfPeople = newNumberOfPeople;
    });

    describe ('the method to post a new beacon', function () {
      var expectedPost = {
        title: newTitle,
        description: newDescription,
        lat: 1,
        lng: 2,
        streetAddress: 'address',
        numberOfPeople: 4,
        senderId: '1',
        recipientIds: []
      };

      beforeEach(function() {
        spyOn(geocoder, 'geocodeAddress');
        spyOn(restService, 'createBeacon');
      });

      it('should lookup the street address and city with the geocoder and then pass the new beacon POST to the socket', function() {
        // Arrange
        rootScope.dataFromServer = {
          currentEntity: {
            id: '1'
          }
        };
        var geocoderResponse = {
          lat: expectedPost.lat,
          lng: expectedPost.lng,
          streetAddress: expectedPost.streetAddress
        };

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoder.geocodeAddress).toHaveBeenCalledWith(newStreetAddress, newCity, jasmine.any(Function));
        geocoder.geocodeAddress.calls.argsFor(0)[2](geocoderResponse);
        expect(restService.createBeacon).toHaveBeenCalledWith(expectedPost);
      });

      it('should fail if the title is undefined because a beacon without a title doesn\'t display correctly', function() {
        // Arrange
        scope.beaconData.title = undefined;

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoder.geocodeAddress).not.toHaveBeenCalled();
        expect(restService.createBeacon).not.toHaveBeenCalled();
      });
      it('should fail if the description is undefined because a beacon without a description doesn\'t display correctly', function() {
        // Arrange
        scope.beaconData.description = undefined;

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoder.geocodeAddress).not.toHaveBeenCalled();
        expect(restService.createBeacon).not.toHaveBeenCalled();
      });
      it('should fail if the number of people is undefined because the UI doesn\'t support not defining this', function() {
        // Arrange
        scope.beaconData.numberOfPeople = undefined;

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoder.geocodeAddress).not.toHaveBeenCalled();
        expect(restService.createBeacon).not.toHaveBeenCalled();
      });
    });
  });
});