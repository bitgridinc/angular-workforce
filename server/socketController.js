/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance
  , beaconDatabase = require('./esri/beaconDatabase/beaconDatabase')
  , organizationDatabase = require('./inMemory/organizations/organizationDatabase')
  , messageDatabase = require('./inMemory/messages/messageDatabase')
  , domain = require('./domain');

function populateBeaconsWithResponses(beacons) {
  beacons.forEach(function(beacon) {
    domain.populateBeaconWithMessages(beacon, messageDatabase.getMessagesByBeaconId(beacon.id));
  });

  return beacons;
}

io.sockets.on('connection', function(client){
  var clientOrganization = organizationDatabase.getCurrentOrganization();
  client.join(clientOrganization.id);

  beaconDatabase.getAllBeacons(function(beacons) {
    // While I could just do client.emit(..., this is useful way to remembering how to address a specific client.
    io.to(clientOrganization.id).emit('init', {
      allOrganizations: organizationDatabase.getAllOrganizations(),
      currentOrganization: clientOrganization,
      beacons: populateBeaconsWithResponses(beacons)
    });
  });
});
