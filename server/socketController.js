/* jslint node: true */
'use strict';

var beaconDatabase = require('./esri/beaconDatabase/beaconDatabase')
  , organizationDatabase = require('./inMemory/organizations/organizationDatabase')
  , messageDatabase = require('./inMemory/messages/messageDatabase')
  , domain = require('./domain');

function populateBeaconsWithResponses(beacons) {
  beacons.forEach(function(beacon) {
    domain.populateBeaconWithMessages(beacon, messageDatabase.getMessagesByBeaconId(beacon.id));
  });

  return beacons;
}

module.exports = function(sioServer) {
  sioServer.sockets.on('connection', function(sioSocket){
    console.log('Client connected');
    var clientOrganization = organizationDatabase.getCurrentOrganization();
    sioSocket.join(clientOrganization.id);

    beaconDatabase.getAllBeacons(function(beacons) {
      sioSocket.emit('init', {
        allOrganizations: organizationDatabase.getAllOrganizations(),
        currentOrganization: clientOrganization,
        beacons: populateBeaconsWithResponses(beacons)
      });
    });
  });
};
