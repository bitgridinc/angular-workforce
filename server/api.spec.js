"use strict";

var http = require('http'),
    request = require('request'),
    io = require('socket.io-client');

var serverURL = 'http://0.0.0.0:8080';
var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('the create beacon API method', function() {
  it('should send the new beacon to all connected clients', function() {
    // Arrange
    var messageCalled = false;
    var client = io.connect(serverURL, options);
    client.on('message', function(data) {
      messageCalled = true;
      expect(data.contents).toBeDefined();
      expect(data.contents.id).toBeDefined();
      expect(data.senderId).toBeDefined();
      expect(data.rootMessageId).toBeDefined();
    });

    // Act
    request.post(
      {
        uri: serverURL + '/beacon',
        body: JSON.stringify({
          contents: {
            title: 'title',
            description: 'description',
            lat: 1,
            lng: 2
          },
          senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
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

describe('the offer assistance API method', function() {
  it('should send the offer to all connected clients', function() {
    // Arrange
    var messageCalled = false;
    var client = io.connect(serverURL, options);
    client.on('message', function(data) {
      messageCalled = true;
      expect(data.contents).toBeDefined();
      expect(data.contents.id).toBeDefined();
      expect(data.senderId).toBeDefined();
      expect(data.rootMessageId).toBeDefined();
    });

    // Act
    request.post(
      {
        uri: serverURL + '/beacon/offer',
        body: JSON.stringify({
          contents: {
            numResponders: 1,
            arrivalDate: new Date()
          },
          senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84',
          rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
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
