/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var storage = require('./storage');

io.sockets.on('connection', function(socket){
  socket.emit('init', {
    allEntities: storage.getAllEntities(),
    currentEntity: storage.getCurrentEntity(),
    beacons: storage.getAllBeacons()
  });
});
