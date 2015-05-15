"use strict";

var factories = require('../../shared/factories');

describe('the fluent factories', function() {
  describe('the beacon factory', function() {
    var beaconFactory;
    beforeEach(function() {
      beaconFactory = factories.newBeaconFactory();
    });
    it('should fail if id/senderId aren\'t specified', function() {
      // Act and Assert an error
      expect(function() { beaconFactory.createBeacon(); }).toThrow();
    });
    it('should create properties implicitly', function() {
      // Act by setting the minimal it/senderId
      var beacon = beaconFactory.withIds(1, 2).createBeacon();

      // Assert properties exist
      expect(beacon.hasOwnProperty('title')).toBeTruthy();
      expect(beacon.hasOwnProperty('description')).toBeTruthy();
      expect(beacon.hasOwnProperty('lat')).toBeTruthy();
      expect(beacon.hasOwnProperty('lng')).toBeTruthy();
      expect(beacon.hasOwnProperty('streetAddress')).toBeTruthy();
      expect(beacon.hasOwnProperty('numberOfPeople')).toBeTruthy();
      expect(beacon.responses.length).toBe(0);
      expect(beacon.acceptedAssistance.length).toBe(0);
    });
    it('should store properties passed in properly', function() {
      // Arrange properties to pass in
      var properties = {
        id: 1,
        senderId: 'abc',
        title: 'gkjdasf',
        description: 'fdaslgfd dsgf dsg',
        lat: 34,
        lng: 85,
        streetAddress: '342 fdklsg fds',
        numberOfPeople: '4-6'
      };

      // Act by setting the minimal it/senderId
      var beacon = beaconFactory
        .withIds(properties.id, properties.senderId)
        .withSummaryText(properties.title, properties.description)
        .withLocation(properties.lat, properties.lng)
        .withAddress(properties.streetAddress)
        .withNumberOfPeople(properties.numberOfPeople)
        .createBeacon();

      // Assert properties exist
      expect(beacon.id).toBe(properties.id);
      expect(beacon.senderId).toBe(properties.senderId);
      expect(beacon.title).toBe(properties.title);
      expect(beacon.description).toBe(properties.description);
      expect(beacon.lat).toBe(properties.lat);
      expect(beacon.lng).toBe(properties.lng);
      expect(beacon.streetAddress).toBe(properties.streetAddress);
      expect(beacon.numberOfPeople).toBe(properties.numberOfPeople);
      expect(beacon.responses.length).toBe(0);
      expect(beacon.acceptedAssistance.length).toBe(0);
    });
  });
  describe('the beacon POST factory', function() {

  });
  describe('the assistance response factory', function() {

  });
});
