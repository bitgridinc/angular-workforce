/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var beaconDatabase = require('./esri/beaconDatabase/beaconDatabase');
var organizationDatabase = require('./inMemory/organizations/organizationDatabase');
var messageDatabase = require('./inMemory/messages/messageDatabase');

// TODO: Move this elsewhere
function populateBeaconsWithResponses(beacons) {
  beacons.forEach(function(beacon) {
    var messages = messageDatabase.getMessagesByBeaconId(beacon.id);
    messages.forEach(function(message) {
      beacon.responses.push(message);
    });
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
