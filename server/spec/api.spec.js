"use strict";

var http = require('http')
  , request = require('request')
  , apiRoutes = require('../../shared/apiRoutes')
  , factories = require('../../shared/factories')
  , waitsForAndRuns = require('./support/waitsForAndRuns')
  , constants = require('./support/constants')
  , Client = require('./support/socketClient');

// TODO: Test recipients
/*describe('the create beacon API method', function() {
  it('should be able to send a new beacon back to the client', function(done) {
    // Arrange
    var messageCalled = false;
    // TODO: Must be able to specify who you are
    Client().on('newBeacon', function(data) {
      messageCalled = true;
      expect(data.id).toBeDefined();
      expect(data.senderId).toBeDefined();
      done();
    });

    // Act
    request.post(
      {
        uri: constants.serverUrl + apiRoutes.createBeacon,
        body: JSON.stringify(factories.newBeaconPostFactory()
          .withSenderId('7a95759f-3df8-4f16-bb43-24f4329fe3df')
          .withSummaryText('title', 'description')
          .withLocation(1, 2)
          .withRecipientId('7a95759f-3df8-4f16-bb43-24f4329fe3df')
          .createBeaconPost()
        )
      }
    );

    // Assert
    waitsForAndRuns(
      function() { return messageCalled === true; },
      function() { expect(messageCalled).toBe(true); },
      1000);
  });
});

describe('the offer assistance API method', function() {
  it('should send the offer to all connected clients', function(done) {
    // Arrange
    var messageCalled = false;
    Client().on('assistanceResponse', function(data) {
      messageCalled = true;
      expect(data.id).toBeDefined();
      expect(data.numResponders).toBeDefined();
      expect(data.arrivalDate).toBeDefined();
      expect(data.senderId).toBeDefined();
      expect(data.beaconId).toBeDefined();
      done();
    });

    // Act
    request.post(
      {
        uri: constants.serverUrl + apiRoutes.offerAssistance,
        body: JSON.stringify({
          contents: {
            numResponders: 1,
            arrivalDate: new Date()
          },
          senderId: '7a95759f-3df8-4f16-bb43-24f4329fe3df',
          beaconId: 117
        })
      }
    );

    // Assert
    waitsForAndRuns(
      function() { return messageCalled === true; },
      function() { expect(messageCalled).toBe(true); },
      1000);
  });
});*/
