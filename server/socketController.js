/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var storage = require('./storage');

io.sockets.on('connection', function(client){
  var clientEntity = storage.getCurrentEntity();
  console.log('Joining newly connected client: ', clientEntity.id);
  client.join(clientEntity.id);

  // While I could just do client.emit(..., this is useful way to remembering how to address a specific client.
  io.to(clientEntity.id).emit('init', {
    allEntities: storage.getAllEntities(),
    currentEntity: clientEntity,
    beacons: storage.getAllBeacons()
  });
});
