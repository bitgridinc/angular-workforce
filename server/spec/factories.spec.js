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
      var beacon = beaconFactory.withRequired(1, 2).createBeacon();

      // Assert an unspecified property, title in this case, is defined, as well as the response arrays
      expect(beacon.hasOwnProperty('title')).toBeTruthy();
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
        zip: '12345',
        startDate: new Date(2015, 1, 1),
        numberOfPeople: '4-6'
      };

      // Act by setting the minimal it/senderId
      var beacon = beaconFactory
        // Don't unit test 1-line passthroughs. Integration tests are the answer here.
        .withRequired(properties.id, properties.senderId, properties.title, properties.description, properties.lat, properties.lng)
        .withAddress(properties.streetAddress, properties.zip)
        .withDate(properties.startDate)
        .withNumberOfPeople(properties.numberOfPeople)
        .createBeacon();

      // Assert one property from every method
      expect(beacon.id).toBe(properties.id);
      expect(beacon.title).toBe(properties.title);
      expect(beacon.lat).toBe(properties.lat);
      expect(beacon.streetAddress).toBe(properties.streetAddress);
      expect(beacon.zip).toBe(properties.zip);
      expect(beacon.startDate).toBe(properties.startDate);
      expect(beacon.numberOfPeople).toBe(properties.numberOfPeople);
    });
  });
  describe('the beacon POST factory', function() {
    var beaconPostFactory;
    beforeEach(function() {
      beaconPostFactory = factories.newBeaconPostFactory();
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
    it('should allow specifying ids', function() {
      // Arrange
      var id = 'this_is_an_id';

      // Act by creating the assistance response
      var assistanceResponse =
        assistanceResponseFactory
          .withIds(id, 'this_is_a_sender_id', 'this_is_a_beacon_id')
          .createAssistanceResponse();

      // Assert it was saved properly
      expect(assistanceResponse.id).toBe(id);
    });
  });
});
