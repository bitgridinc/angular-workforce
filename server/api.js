"use strict";

var domain = require('./domain'),
    beaconDatabase = require('./esri/beaconDatabase/beaconDatabase'),
    io = require('./socketSetup').instance,
    _ = require('lodash');

module.exports = {
  createBeacon: {
    handler: function (request, reply) {
      console.log('createBeacon handler called with payload:', request.payload);

      beaconDatabase.saveBeacon(domain.createBeacon(request.payload), function(result) {
        beaconDatabase.getBeaconById(result.objectId, function(beacon) {
          // Send the new beacon to all recipients
          _.forEach(request.payload.recipientIds, function(recipientId) {
            console.log('Sending new beacon to recipient: ', recipientId);
            io.to(recipientId).emit('newBeacon', beacon);
          });

          // And send it back to the sender as well
          io.to(request.payload.senderId).emit('newBeacon', beacon);

          // This is needed to terminate the request on the client side
          reply({status: 'ok'});
        });
      });
    },
    app: {
      name: 'beacon'
    }
  },
  offerAssistance: {
    handler: function (request, reply) {
      console.log('offerAssistance handler called with payload:', request.payload);

      beaconDatabase.getBeaconById(request.payload.beaconId, function(beacon) {
        if (beacon === undefined) {
          console.log('Beacon not found with id: ', request.payload);
          reply({ status: 'error' });
        }

        var assistanceResponse = domain.offerAssistance(request.payload.senderId, beacon, request.payload.contents);

        io.sockets.emit('assistanceResponse', assistanceResponse);

        // This is needed to terminate the request on the client side
        reply({status: 'ok'});
      });
    },
    app: {
      name: 'beacon'
    }
  },
  acceptAssistance: {
    handler: function (request, reply) {
      console.log('acceptAssistance handler called with payload:', request.payload);

      beaconDatabase.getBeaconById(request.payload.beaconId, function(beacon) {
        var acceptedResponse = domain.acceptAssistance(request.payload.senderId, beacon, request.payload.contents);
        console.log('This response was accepted:', acceptedResponse);

        var acceptResponseMessage = {
          beaconId: beacon.id,
          responseId: acceptedResponse.id
        };
        console.log('Sending this:', acceptResponseMessage);
        io.sockets.emit('acceptedAssistance', acceptResponseMessage);

        // This is needed to terminate the request on the client side
        reply({status: 'ok'});
      });
    },
    app: {
      name: 'beacon'
    }
  }
};
