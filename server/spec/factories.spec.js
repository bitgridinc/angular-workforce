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
    var beaconPostFactory;
    beforeEach(function() {
      beaconPostFactory = factories.newBeaconPostFactory();
    });
    it('should allow specifying a senderId', function() {
      // Arrange
      var senderId = 'from_an_org';

      // Act by creating the beaconPost
      var beaconPost = beaconPostFactory.withSenderId(senderId).createBeaconPost();

      // Assert it was saved properly
      expect(beaconPost.senderId).toBe(senderId);
    });
    it('should allow specifying a title and description', function() {
      // Arrange
      var title = 'titacular';
      var description = 'desc';

      // Act by creating the beaconPost
      var beaconPost = beaconPostFactory.withSummaryText(title, description).createBeaconPost();

      // Assert they were saved properly
      expect(beaconPost.title).toBe(title);
      expect(beaconPost.description).toBe(description);
    });
    it('should allow specifying a location in latitude/longitude', function() {
      // Arrange
      var latitude = 23;
      var longitude = 54;

      // Act by creating the beaconPost
      var beaconPost = beaconPostFactory.withLocation(latitude, longitude).createBeaconPost();

      // Assert they were saved properly
      expect(beaconPost.lat).toBe(latitude);
      expect(beaconPost.lng).toBe(longitude);
    });
    it('should allow specifying a street address', function() {
      // Arrange
      var streetAddress = '123 Street St';

      // Act by creating the beaconPost
      var beaconPost = beaconPostFactory.withAddress(streetAddress).createBeaconPost();

      // Assert it was saved properly
      expect(beaconPost.streetAddress).toBe(streetAddress);
    });
    it('should allow specifying a number of people requested', function() {
      // Arrange
      var numberOfPeople = '4-5';

      // Act by creating the beaconPost
      var beaconPost = beaconPostFactory.withNumberOfPeople(numberOfPeople).createBeaconPost();

      // Assert it was saved properly
      expect(beaconPost.numberOfPeople).toBe(numberOfPeople);
    });
    it('should allow specifying recipients one at a time', function() {
      // Arrange
      var recipientId = 'another_org';

      // Act by creating the beaconPost
      var beaconPost = beaconPostFactory.withRecipientId(recipientId).createBeaconPost();

      // Assert they were saved properly
      expect(beaconPost.recipientIds.length).toBe(1);
      expect(beaconPost.recipientIds[0]).toBe(recipientId);
    });
    it('should allow specifying recipients in bulk', function() {
      // Arrange
      var recipientIds = [
        'first_recipient',
        'second_recipient',
        'third_recipient'
      ];

      // Act by creating the beaconPost
      var beaconPost = beaconPostFactory.withRecipientIds(recipientIds).createBeaconPost();

      // Assert they were saved properly
      expect(beaconPost.recipientIds.length).toBe(recipientIds.length);
      expect(beaconPost.recipientIds[0]).toBe(recipientIds[0]);
      expect(beaconPost.recipientIds[1]).toBe(recipientIds[1]);
      expect(beaconPost.recipientIds[2]).toBe(recipientIds[2]);
    });
  });
  describe('the assistance response factory', function() {
    var assistanceResponseFactory;
    beforeEach(function() {
      assistanceResponseFactory = factories.newAssistanceResponseFactory();
    });
    it('should allow specifying the ids of it, its sender, and its associated beacon', function() {
      // Arrange
      var id = 'this_is_an_id';
      var senderId = 'this_is_a_sender_id';
      var beaconId = 'this_is_a_beacon_id';

      // Act by creating the assistance response
      var assistanceResponse =
        assistanceResponseFactory
          .withIds(id, senderId, beaconId)
          .createAssistanceResponse();

      // Assert it was saved properly
      expect(assistanceResponse.id).toBe(id);
      expect(assistanceResponse.senderId).toBe(senderId);
      expect(assistanceResponse.beaconId).toBe(beaconId);
    });
    it('should allow specifying who\'s coming along to help', function() {
      // Arrange
      var numResponders = '4-6';
      var arrivalDate = new Date();

      // Act by creating the assistance response
      var beaconPost =
        assistanceResponseFactory
          .withResponderCrew(numResponders, arrivalDate)
          .createAssistanceResponse();

      // Assert it was saved properly
      expect(beaconPost.numResponders).toBe(numResponders);
      expect(beaconPost.arrivalDate).toBe(arrivalDate);
    });
  });
});
