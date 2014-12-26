/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var uuid = require('node-uuid');
var stubbedDb = require('./stubbedDb');

io.sockets.on('connection', function(socket){
  socket.emit('init', stubbedDb.getOrganization());
  socket.emit('send:request', {
    id: uuid.v4(),
    organization: {
      name: 'Macho Diggers'
    },
    title: 'Existing Title',
    description: 'Existing Description',
    lat: 38.9,
    lng: -77.0
  });

  socket.on('send:request', function(request) {
    request.id = uuid.v4();

    // This sends back to the sender as well
    io.sockets.emit('send:request', request);
  });
});
