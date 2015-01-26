/* jslint node: true */
'use strict';

var io = require('./socketSetup').instance;
var uuid = require('node-uuid');
var repository = require('./repository');

io.sockets.on('connection', function(socket){
  socket.emit('init', {
    allEntities: repository.getAllEntities(),
    currentEntity: repository.getCurrentEntity()
  });

  repository.getAllMessages().forEach(function(item) {
    socket.emit('message', item);
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
