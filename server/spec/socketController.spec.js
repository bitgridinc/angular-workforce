"use strict";

var waitsForAndRuns = require('./support/waitsForAndRuns')
  , client = require('./support/socketClient')();

describe('the socket controller', function() {
  /*it('should send an init message', function(done) {
    var initCalled = false;
    client.on('init', function(data) {
      initCalled = true;
      expect(data.allOrganizations.length).toBeDefined();
      expect(data.currentOrganization.id).toBeDefined();
      expect(data.beacons.length).toBeDefined();
      done();
    });

    waitsForAndRuns(
      function() { return initCalled === true; },
      function() { expect(initCalled).toBe(true); },
      5000);
  });*/
});
