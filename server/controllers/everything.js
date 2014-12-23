/* jslint node: true */
"use strict";

var everything = require('../models/everything');
var Hapi = require('hapi');

module.exports = {
  getBeacons: {
    handler: function (request, reply) {
      console.log('getBeacons handler called');
      everything.getBeacons(function (err, beacons) {
        if (err) {
          console.log('getBeacons handler error');
          // TODO: Make a constants file
          var error = Hapi.error.badRequest('Cannot get beacons!');
          error.output.statusCode = 400;
          reply(error);
        } else {
          console.log('getBeacons handler success');
          reply(beacons);
        }
      });
    },
    app: {
      name: 'beacon'
    }
  },
  createBeacon: {
    handler: function (request, reply) {
      console.log('createBeacon handler called', request.payload);
      everything.createBeacon(request.payload.organization, request.payload.title, request.payload.description, request.payload.lat, request.payload.lng, function (err, beacon) {
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
      });
    },
    app: {
      name: 'beacon'
    }
  }
};
