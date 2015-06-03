"use strict";

describe('the rest service', function() {
  var restService
    , $httpBackend;

  beforeEach(module('modules.providers'));
  beforeEach(inject(function(_$injector_, _RestService_) {
    $httpBackend = _$injector_.get("$httpBackend");
    restService = _RestService_;
  }));
  // This is a workaround for a bug in angular, see: https://github.com/angular/angular.js/issues/11373
  beforeEach(inject(function(_$browser_) {
    _$browser_.cookies = function() { return {}; }
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('the createBeacon function', function() {
    var beaconData;
    beforeEach(function() {
      beaconData = {
        title: "title",
        description: "description",
        streetAddress: "streetAddress",
        zip: "zip",
        numberOfPeople: "numberOfPeople"
      }
    });

    function expectErrorCallbackCalledWith(propertyName) {
      // Act
      restService.createBeacon(beaconData, function(missingProperty) {
        // Assert
        expect(missingProperty).toEqual(propertyName);
      });
    }

    it('the createBeacon function should error on missing properties (1)', function() {
      // Arrange
      beaconData.description = null;
      beaconData.zip = '';
      delete beaconData.numberOfPeople;

      // Act and Assert
      expectErrorCallbackCalledWith(['description', 'zip', 'numberOfPeople']);
    });
    it('the createBeacon function should error on missing properties (2)', function() {
      // Arrange
      delete beaconData.title;
      beaconData.description = undefined;
      beaconData.streetAddress = null;

      // Act and Assert
      expectErrorCallbackCalledWith(['title', 'description', 'streetAddress']);
    });
  });

  /*describe('the geocode address method', function() {
    it('should return the latitude and longitude parsed from a Nominatim response', function() {
      var expectedGetUrl = 'http://nominatim.openstreetmap.org/search?q=2729+Merrilee+Dr+22031&addressdetails=1&format=json';
      $httpBackend.expectGET(expectedGetUrl);
      $httpBackend.when('GET', expectedGetUrl)
        .respond([
          {
            place_id: "2384001222"
          }
        ]);

      restService.geocodeAddress('2729 Merrilee Dr', '22031', function(address) {
        console.log('Geocoder returned: ', address);
        expect(address).toEqual({
          lat: 38.8793003636364,
          lng: -77.230676,
          streetAddress: '2729 Merrilee Drive'
        });
      });
      $httpBackend.flush();
    });
  });*/
});
