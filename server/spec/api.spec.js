"use strict";

var http = require('http'),
    request = require('request'),
    io = require('socket.io-client'),
    apiRoutes = require('../../shared/apiRoutes'),
    factories = require('../../shared/factories');

var serverURL = 'http://0.0.0.0:8080';
var options = {
  transports: ['websocket'],
  'force new connection': true
};

// TODO: Test recipients
describe('the create beacon API method', function() {
  it('should be able to send a new beacon back to the client', function() {
    // Arrange
    var messageCalled = false;
    // TODO: Must be able to specify who you are
    var client = io.connect(serverURL, options);
    client.on('newBeacon', function(data) {
      messageCalled = true;
      expect(data.id).toBeDefined();
      expect(data.senderId).toBeDefined();
    });

    // Act
    request.post(
      {
        uri: serverURL + apiRoutes.createBeacon,
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
    waitsFor(function() {
      return messageCalled === true;
    }, 'messageCalled to be set to true', 1000);

    // Jasmine calls waitsFor and runs in order and will wait for waitsFor to finish before calling this runs
    runs(function() {
      expect(messageCalled).toBe(true);
    });
  });
});

describe('the offer assistance API method', function() {
  it('should send the offer to all connected clients', function() {
    // Arrange
    var messageCalled = false;
    var client = io.connect(serverURL, options);
    client.on('assistanceResponse', function(data) {
      messageCalled = true;
      expect(data.id).toBeDefined();
      expect(data.numResponders).toBeDefined();
      expect(data.arrivalDate).toBeDefined();
      expect(data.senderId).toBeDefined();
      expect(data.beaconId).toBeDefined();
    });

    // Act
    request.post(
      {
        uri: serverURL + apiRoutes.offerAssistance,
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
    waitsFor(function() {
      return messageCalled === true;
    }, 'messageCalled to be set to true', 1000);

    // Jasmine calls waitsFor and runs in order and will wait for waitsFor to finish before calling this runs
    runs(function() {
      expect(messageCalled).toBe(true);
    });
  });
});
