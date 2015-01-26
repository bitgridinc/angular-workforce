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
