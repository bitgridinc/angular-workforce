"use strict";

var waitsForAndRuns = require('./support/waitsForAndRuns')
  , client = require('./support/socketClient')();

describe('the socket controller', function() {
  it('should send an init message', function(done) {
    var initCalled = false;
    client.on('init', function(data) {
      initCalled = true;
      expect(data.allEntities.length).toBeGreaterThan(0);
      expect(data.currentEntity.id).toBeDefined();
      expect(data.beacons.length).toBeGreaterThan(0);
      done();
    });

    waitsForAndRuns(
      function() { return initCalled === true; },
      function() { expect(initCalled).toBe(true); },
      2000);
  });
});
