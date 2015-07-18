"use strict";

var db = require('../messageDatabase')
  , factories = require('../../../../shared/factories')
  , proxyquire = require('proxyquire')
  , inProduction = require('../../../spec/support/environmentHelpers').inProduction;

inProduction(function() {
  describe('the messageDatabase', function() {
    var db
      , messageId = '2cf8faaa-5760-41c9-adbf-5a4482ac3469'
      , beaconId = 123
      , testData = [
        factories.newAssistanceResponseFactory()
          .withIds(messageId, 'a9ZaRCDMCo0WWZO7', beaconId)
          .withResponderCrew('4', new Date(2015, 1, 1, 1, 1, 1))
          .createAssistanceResponse()
      ];
    beforeEach(function() {
      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      db = proxyquire('../messageDatabase', {
        './messageDatabase.prod.js': testData
      });
    }); // Set up the messageDatabase with some test data

    describe('acceptMessage function', function() {
      it('should set accepted to true on the test beacon', function() {
        // Act
        db.acceptMessage(messageId);

        // Assert
        expect(testData[0].accepted).toBeTruthy();
      });
    });
    describe('saveMessage function', function() {
      it('should push the message onto the test data array', function() {
        // Arrange
        var message = factories.newAssistanceResponseFactory().createAssistanceResponse();

        // Act
        db.saveMessage(message);

        // Assert
        expect(testData[1]).toBe(message);
      });
    });
    describe('getMessagesByBeaconId function', function() {
      it('should return the messages for the beacon', function() {
        // Act
        var messages = db.getMessagesByBeaconId(beaconId);

        // Assert
        expect(messages[0]).toBe(testData[0]);
      });
      it('should return an empty array for a non-existent beaconId', function() {
        // Act
        var messages = db.getMessagesByBeaconId(beaconId + 1);

        // Assert
        expect(messages.length).toBe(0);
      });
    });
  });
});
