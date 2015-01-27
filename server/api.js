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

      // Send the new beacon to all connected clients
      io.sockets.emit('message', {
        contents: beacon,
        senderId: request.payload.senderId,
        rootMessageId: beacon.id
      });
    },
    app: {
      name: 'beacon'
    }
  },
  offerAssistance: {
    handler: function (request, reply) {
      console.log('offerAssistance handler called with payload:', request.payload);

      var beacon = storage.getBeaconById(request.payload.rootMessageId);
      var offer = domain.offerAssistance(request.payload.senderId, beacon, request.payload.contents);

      // TODO: Break these messages up (e.g., new:offer)
      io.sockets.emit('message', {
        senderId: request.payload.senderId,
        rootMessageId: request.payload.rootMessageId,
        contents: offer
      });
    },
    app: {
      name: 'beacon'
    }
  }
};
