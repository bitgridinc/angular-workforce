"use strict";

var domain = require('./domain');
var storage = require('./storage');
var io = require('./socketSetup').instance;

module.exports = {
  createBeacon: {
    handler: function (request, reply) {
      console.log('createBeacon handler called with payload:', request.payload);

      // Be prepared to pass in the entire sender rather than just the id, if necessary
      var beacon = domain.createBeacon(
        request.payload.senderId,
        request.payload.contents);

      // Eventually, this should be replaced with a database.add
      storage.saveBeacon(beacon);

      // Indicate success regardless because there's no failure path yet
      reply(beacon);

      io.sockets.emit('message', {
        contents: beacon,
        senderId: request.payload.senderId,
        rootMessageId: beacon.id
      });
    },
    app: {
      name: 'beacon'
    }
  }
};
