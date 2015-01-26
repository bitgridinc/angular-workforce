"use strict";

var domain = require('./domain');
var repository = require('./repository');
var io = require('./socketSetup').instance;

module.exports = {
  createBeacon: {
    handler: function (request, reply) {
      console.log('createBeacon handler called with payload:', request.payload);
      var beacon = domain.createBeacon(
        request.payload.senderId,
        request.payload.contents.title,
        request.payload.contents.description,
        request.payload.contents.lat,
        request.payload.contents.lng);

      repository.createBeacon(beacon);

      // Indicate success regardless because there's no failure path yet
      reply(beacon);

      io.sockets.emit('message', {
        contents: beacon,
        senderId: request.payload.senderId,
        rootMessageId: beacon.id
      });

      /*everything.createBeacon(request.payload.organization, request.payload.title, request.payload.description, request.payload.lat, request.payload.lng, function (err, beacon) {
        if (err) {
          console.log('createBeacon handler error');
          // TODO: Make a constants file
          var error = Hapi.error.badRequest('Cannot create beacon!');
          error.output.statusCode = 400;
          reply(error);
        } else {
          console.log('createBeacon handler success');
          reply(beacon);
        }
      });*/
    },
    app: {
      name: 'beacon'
    }
  }
};
