"use strict";

describe('the new beacon creation factory', function() {
  var rootScope,
      scope,
      factory,
      restService,
      geocoderService,
      fluentSharedLibraryService;

  beforeEach(module('modules.providers'));
  beforeEach(module('modules.createBeacon'));
  beforeEach(inject(function ($rootScope, _NewBeaconFactory_, RestService, _GeocoderService_, _FluentSharedLibrariesService_) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    factory = _NewBeaconFactory_;
    restService = RestService;
    geocoderService = _GeocoderService_;
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
      var expectedPost;

      beforeEach(function() {
        expectedPost = fluentSharedLibraryService.newBeaconPostFactory()
          .withSenderId('1')
          .withSummaryText(newTitle, newDescription)
          .withLocation(1, 2)
          .withAddress(newStreetAddress)
          .withNumberOfPeople(newNumberOfPeople)
          .createBeaconPost();
      });
      beforeEach(function() {
        spyOn(geocoderService, 'geocodeAddress');
        spyOn(restService, 'createBeacon');
      });

      it('should lookup the street address and city with the geocoder and then pass the new beacon POST to the socket', function() {
        // Arrange
        rootScope.dataFromServer = {
          currentOrganization: {
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
        expect(geocoderService.geocodeAddress).toHaveBeenCalledWith(newStreetAddress, newCity, jasmine.any(Function));
        geocoderService.geocodeAddress.calls.argsFor(0)[2](geocoderResponse);
        expect(restService.createBeacon).toHaveBeenCalledWith(expectedPost);
      });

      it('should fail if the title is undefined because a beacon without a title doesn\'t display correctly', function() {
        // Arrange
        scope.beaconData.title = undefined;

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoderService.geocodeAddress).not.toHaveBeenCalled();
        expect(restService.createBeacon).not.toHaveBeenCalled();
      });
      it('should fail if the description is undefined because a beacon without a description doesn\'t display correctly', function() {
        // Arrange
        scope.beaconData.description = undefined;

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoderService.geocodeAddress).not.toHaveBeenCalled();
        expect(restService.createBeacon).not.toHaveBeenCalled();
      });
      it('should fail if the number of people is undefined because the UI doesn\'t support not defining this', function() {
        // Arrange
        scope.beaconData.numberOfPeople = undefined;

        // Act
        factory.postNewBeacon();

        // Assert
        expect(geocoderService.geocodeAddress).not.toHaveBeenCalled();
        expect(restService.createBeacon).not.toHaveBeenCalled();
      });
    });
  });
});