/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var beaconDatabase = require('./esri/beaconDatabase/beaconDatabase');
var entityDatabase = require('./inMemory/entities/entityDatabase');

io.sockets.on('connection', function(client){
  var clientEntity = entityDatabase.getCurrentEntity();
  client.join(clientEntity.id);

  beaconDatabase.getAllBeacons(function(beacons) {
    // While I could just do client.emit(..., this is useful way to remembering how to address a specific client.
    io.to(clientEntity.id).emit('init', {
      allEntities: entityDatabase.getAllEntities(),
      currentEntity: clientEntity,
      beacons: beacons
    });
  });
});
