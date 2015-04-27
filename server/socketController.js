/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var beaconStorage = require('./ago/beaconStorage');
var entityStorage = require('./entities/entityStorage');

io.sockets.on('connection', function(client){
  var clientEntity = entityStorage.getCurrentEntity();
  client.join(clientEntity.id);

  beaconStorage.getAllBeacons(function (beacons) {
    // While I could just do client.emit(..., this is useful way to remembering how to address a specific client.
    io.to(clientEntity.id).emit('init', {
      allEntities: entityStorage.getAllEntities(),
      currentEntity: clientEntity,
      beacons: beacons
    });
  });
});
