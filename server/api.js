"use strict";

var domain = require('./domain')
  , beaconDatabase = require('./esri/beaconDatabase/beaconDatabase')
  , userDatabase = require('./esri/userDatabase/userDatabase')
  , messageDatabase = require('./inMemory/messages/messageDatabase')
  , _ = require('lodash');

function replySuccess(reply) {
  // This is needed to terminate the request on the client side
  reply({status: 'ok'});
}

module.exports = function(socketIo) {
  return {
    createBeacon: {
      handler: function(request, reply) {
        console.log('createBeacon handler called with payload:', request.payload);

        beaconDatabase.saveBeacon(domain.createBeacon(request.payload), function(result) {
          beaconDatabase.getBeaconById(result.objectId, function(beacon) {
            // Send the new beacon to all recipients
            _.forEach(request.payload.recipientIds, function(recipientId) {
              console.log('Sending new beacon to recipient: ', recipientId);
              socketIo.to(recipientId).emit('newBeacon', beacon);
            });

            // And send it back to the sender as well
            socketIo.to(request.payload.senderId).emit('newBeacon', beacon);

            replySuccess(reply);
          });
        });
      },
      app: {
        name: 'beacon'
      }
    },
    offerAssistance: {
      handler: function(request, reply) {
        console.log('offerAssistance handler called with payload:', request.payload);

        beaconDatabase.getBeaconById(request.payload.beaconId, function(beacon) {
          if (beacon === undefined) {
            console.log('Beacon not found with id: ', request.payload);
            reply({status: 'error'});
          }

          var assistanceResponse = domain.offerAssistance(request.payload.senderId, beacon, request.payload.contents);

          messageDatabase.saveMessage(assistanceResponse);

          socketIo.sockets.emit('assistanceResponse', assistanceResponse);

          replySuccess(reply);
        });
      },
      app: {
        name: 'beacon'
      }
    },
    acceptAssistance: {
      handler: function(request, reply) {
        console.log('acceptAssistance handler called with payload:', request.payload);
        var acceptedMessageId = request.payload.contents;

        beaconDatabase.getBeaconById(request.payload.beaconId, function(beacon) {

          // TODO: Find best place to put this
          var messages = messageDatabase.getMessagesByBeaconId(beacon.id);
          if (!_.find(messages, function(message) { return message.id === acceptedMessageId; })) {
            throw new Error('Message not found with id: ' + acceptedMessageId);
          }

          messageDatabase.acceptMessage(acceptedMessageId);
          console.log('This response was accepted:', acceptedMessageId);

          var acceptResponseMessage = {
            beaconId: beacon.id,
            responseId: acceptedMessageId
          };
          console.log('Sending this:', acceptResponseMessage);
          socketIo.sockets.emit('acceptedAssistance', acceptResponseMessage);

          replySuccess(reply);
        });
      },
      app: {
        name: 'beacon'
      }
    },
    getAllUsers: {
      handler: function(request, reply) {
        console.log('getAllUsers handler called with payload: ', request.payload);
        userDatabase.getAllUsers().then(function(json) {
          console.log('getAllUsers handler returning: ', json);
          reply(json);
        });
      },
      app: {
        name: 'users'
      }
    }
  }
};
