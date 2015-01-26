"use strict";

module.exports = {
  createBeacon: {
    handler: function (request, reply) {
      console.log('createBeacon handler called', request);


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
