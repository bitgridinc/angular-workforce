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
      title: 'Your Title',
      description: 'Your Description',
      lat: 38.9,
      lng: -77.0
    },
    senderId: '55a2726e-43ff-4ea9-8d3e-b7c439ef0e84', // Your Organization
    rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
  });
  socket.emit('message', {
    contents: {
      id: '2cf8faaa-5760-41c9-adbf-5a4482ac3469',
      numResponders: 4,
      arrivalDate: new Date()
    },
    senderId: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69', // Their Organization
    rootMessageId: 'e688af0b-63df-48bc-941c-9cc5f750367b'
  });
  socket.emit('message', {
    contents: {
      id: 'a7609f5c-2924-4a46-8ba3-aa27837c3d2f',
      title: 'Their Title',
      description: 'Their Description',
      lat: 38.88,
      lng: -77.02
    },
    senderId: '7cf52dba-992e-4f3f-bbb7-36f4b1792e69', // Their Organization
    rootMessageId: 'a7609f5c-2924-4a46-8ba3-aa27837c3d2f'
  });

  socket.on('message', function(message) {
    if (message.contents === null || message.contents === undefined) {
      console.log('Message didn\'t contain a contents property. Ignoring message.');
    }
    else {
      // The id is the unique key used to handle selection in the UI
      message.contents.id = uuid.v4();

      if (message.rootMessageId === undefined) {
        message.rootMessageId = message.contents.id;
      }

      // This sends back to the sender as well
      io.sockets.emit('message', message);
    }
  });
});
