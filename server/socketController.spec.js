"use strict";

var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:8080';
var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('the socket controller', function() {
  it('should send an init message', function() {
    var client = io.connect(socketURL, options);

    var initCalled = false;
    client.on('init', function(data) {
      initCalled = true;
      expect(data.allEntities.length).toBe(3);
      expect(data.currentEntity.id).toBeDefined();
    });

    waitsFor(function() {
      return initCalled === true;
    }, 'initCalled to be set to true', 1000);

    // Jasmine calls waitsFor and runs in order and will wait for waitsFor to finish before calling this runs
    runs(function() {
      expect(initCalled).toBe(true);
    });
  });

  /*it('should send some existing messages (beacons, responses, etc.)', function() {
    var client = io.connect(socketURL, options);

    var messageCalled = false;
    client.on('message', function(data) {
      messageCalled = true;
      expect(data.contents).toBeDefined();
      expect(data.contents.id).toBeDefined();
      expect(data.senderId).toBeDefined();
      expect(data.rootMessageId).toBeDefined();
    });

    waitsFor(function() {
      return messageCalled === true;
    }, 'messageCalled to be set to true', 1000);

    // Jasmine calls waitsFor and runs in order and will wait for waitsFor to finish before calling this runs
    runs(function() {
      expect(messageCalled).toBe(true);
    });
  });*/
});
