/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var uuid = require('node-uuid');
var generator = require('./generator');

io.sockets.on('connection', function(socket){
  socket.emit('init', {
    name: generator.generateName()
  });

  socket.on('send:request', function(request) {
    request.id = uuid.v4();

    // This sends back to the sender as well
    io.sockets.emit('send:request', request);
  });
});
