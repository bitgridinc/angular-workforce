"use strict";

var waitsForAndRuns = require('./support/waitsForAndRuns')
  , client = require('./support/socketClient')();

function verifyBeaconIds(beacon, id, senderId) {
  expect(beacon.id).toBe(id);
  expect(beacon.senderId).toBe(senderId);
}

function verifyResponseExistenceAndSenderId(beacon, responseIndex, senderId) {
  expect(beacon.responses.length).toBeGreaterThan(responseIndex);
  if (beacon.responses.length > responseIndex) {
    expect(beacon.responses[responseIndex].senderId).toBe(senderId);
  }
}

function verifyValidBeacons(beacons) {
  var murfreesboroId = '7a95759f-3df8-4f16-bb43-24f4329fe3df'
    , morristownId = '323f8a60-37c6-4d97-a2f8-331c2231e92b';

  expect(beacons.length).toBe(4);

  var firstBeacon = beacons[0];
  verifyBeaconIds(firstBeacon, 30, murfreesboroId);
  verifyResponseExistenceAndSenderId(firstBeacon, 0, morristownId);

  verifyBeaconIds(beacons[1], 31, morristownId);

  var thirdBeacon = beacons[2];
  verifyBeaconIds(thirdBeacon, 32, morristownId);
  verifyResponseExistenceAndSenderId(thirdBeacon, 0, murfreesboroId);

  verifyBeaconIds(beacons[3], 33, murfreesboroId);
}

describe('the socket controller', function() {
  it('should send an init message', function(done) {
    var initCalled = false;
    client.on('init', function(data) {
      initCalled = true;
      expect(data.allOrganizations.length).toBe(4);
      expect(data.currentOrganization.id).toBeDefined();
      verifyValidBeacons(data.beacons);
      done();
    });

    waitsForAndRuns(
      function() { return initCalled === true; },
      function() { expect(initCalled).toBe(true); },
      2000);
  });
});
