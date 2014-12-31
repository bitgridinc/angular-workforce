/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var uuid = require('node-uuid');
var stubbedDb = require('./stubbedDb');

io.sockets.on('connection', function(socket){
  socket.emit('init', {
    allEntities: stubbedDb.getAllEntities(),
    currentEntity: stubbedDb.getCurrentEntity()
  });

  socket.emit('message', {
    contents: {
      id: 'e688af0b-63df-48bc-941c-9cc5f750367b',
      title: 'Existing Title',
      description: 'Existing Description',
      lat: 38.9,
      lng: -77.0
    },
    metadata: {
      senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84'
    }
  });

  socket.on('message', function(message, treeId, replyToId) {
    if (message.contents === null || message.contents === undefined) {
      console.log('Message didn\'t contain a contents property. Ignoring message.');
    }
    else {
      // The id is the unique key used to handle selection in the UI
      message.contents.id = uuid.v4();

      // This sends back to the sender as well
      io.sockets.emit('message', message);
    }
  });
});
