"use strict";

var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:8080';
var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('the socket controller', function() {
  it('should send an init message', function() {
    /*var client = io.connect(socketURL, options);

    var initCalled = false;
    client.on('init', function(data) {
      initCalled = true;
      expect(data.allEntities.length).toBe(4);
      expect(data.currentEntity.id).toBeDefined();
      expect(data.beacons.length).toBeGreaterThan(1);
    });

    waitsFor(function() {
      return initCalled === true;
    }, 'initCalled to be set to true', 1000);

    // Jasmine calls waitsFor and runs in order and will wait for waitsFor to finish before calling this runs
    runs(function() {
      expect(initCalled).toBe(true);
    });*/
  });
});