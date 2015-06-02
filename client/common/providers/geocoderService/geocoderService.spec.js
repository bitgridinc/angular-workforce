"use strict";

describe('the geocoder service (address -> lat/lng)', function() {
  var geocoderService
    , $httpBackend;

  beforeEach(module('modules.providers'));
  beforeEach(inject(function(_$injector_, _GeocoderService_) {
    $httpBackend = _$injector_.get("$httpBackend");
    geocoderService = _GeocoderService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('the geocode address method', function() {
    it('should return the latitude and longitude parsed from a Nominatim response', function() {
      var expectedGetUrl = 'http://nominatim.openstreetmap.org/search?q=2729+Merrilee+Dr+22031&addressdetails=1&format=json';
      $httpBackend.expectGET(expectedGetUrl);
      $httpBackend.when('GET', expectedGetUrl)
        .respond([
          {
            place_id: "2384001222",
            licence: "Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright",
            boundingbox: [
              "38.879250363636",
              "38.879350363636",
              "-77.230726",
              "-77.230626"
            ],
            lat: "38.8793003636364",
            lon: "-77.230676",
            display_name: "2729, Merrilee Drive, Merrifield, Fairfax County, Virginia, 22031, United States of America",
            class: "place",
            type: "house",
            importance: 0.411,
            address: {
              house_number: "2729",
              road: "Merrilee Drive",
              locality: "Merrifield",
              county: "Fairfax County",
              state: "Virginia",
              postcode: "22031",
              country: "United States of America",
              country_code: "us"
            }
          }
        ]);

      geocoderService.geocodeAddress('2729 Merrilee Dr', '22031', function(address) {
        console.log('Geocoder returned: ', address);
        expect(address).toEqual({
          lat: 38.8793003636364,
          lng: -77.230676,
          streetAddress: '2729 Merrilee Drive'
        });
      });
      $httpBackend.flush();
    });
  });
});
