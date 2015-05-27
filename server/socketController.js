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

module.exports = function(socketIo) {
  socketIo.sockets.on('connection', function(client){
    var clientOrganization = organizationDatabase.getCurrentOrganization();
    client.join(clientOrganization.id);

    beaconDatabase.getAllBeacons(function(beacons) {
      // While I could just do client.emit(..., this is useful way to remembering how to address a specific client.
      socketIo.to(clientOrganization.id).emit('init', {
        allOrganizations: organizationDatabase.getAllOrganizations(),
        currentOrganization: clientOrganization,
        beacons: populateBeaconsWithResponses(beacons)
      });
    });
  });
};
