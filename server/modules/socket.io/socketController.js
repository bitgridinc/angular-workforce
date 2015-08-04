/* jslint node: true */
'use strict';

var beaconDatabase = require('../../dal/beacons/beaconDatabase')
  , organizationDatabase = require('../../dal/organizations/organizationDatabase')
  , messageDatabase = require('../../dal/messages/messageDatabase')
  , domain = require('../beacon/domain')
  , socketioJwt = require('socketio-jwt')
  , jwt = require('jsonwebtoken');

function populateBeaconsWithResponses(beacons) {
  beacons.forEach(function(beacon) {
    domain.populateBeaconWithMessages(beacon, messageDatabase.getMessagesByBeaconId(beacon.id));
  });

  return beacons;
}

module.exports = function(sioServer) {
  sioServer.set('authorization', socketioJwt.authorize({
    secret: 'secret',
    handshake: true
  }));

  sioServer.sockets.on('connection', function(sioSocket){
    var profile = jwt.decode(sioSocket.handshake.query.token);
    //console.log('Client connected: ', profile);

    var clientOrganization = organizationDatabase.getCurrentOrganization(profile.organization);
    sioSocket.join(clientOrganization.id);
    //console.log('Client part of organization: ', clientOrganization);

    beaconDatabase.getAllBeacons(function(beacons) {
      sioSocket.emit('init', {
        allOrganizations: organizationDatabase.getAllOrganizations(),
        currentOrganization: clientOrganization,
        beacons: populateBeaconsWithResponses(beacons)
      });
    });
  });
};
