"use strict";

var domain = require('./domain')
  , beaconDatabase = require('./../../dal/beacons/beaconDatabase')
  , messageDatabase = require('./../../dal/messages/messageDatabase')
  , jwt = require('jsonwebtoken')
  , _ = require('lodash');

function replySuccess(reply) {
  // This is needed to terminate the request on the client side
  reply({status: 'ok'});
}

module.exports = function(sioServer) {
  return {
    createBeacon: {
      handler: function(request, reply) {
        console.log('createBeacon handler called with payload:', request.payload);

        var requiredProperties = ['recipientIds', 'senderId', 'title', 'description', 'lat', 'lng'];
        var errors = _.filter(requiredProperties, function(requiredProperty) {
          /* jshint -W116 */
          return request.payload[requiredProperty] == null || // Type coercion covers both null and undefined
          /* jshint +W116 */
                 request.payload[requiredProperty] === '';
        });

        if (errors.length > 0) {
          console.log('The payload had the following errors:', request.payload, errors);
          reply({status: 'error'});
        } else {
          beaconDatabase.saveBeacon(domain.createDomainBeacon(request.payload), function(result) {
            beaconDatabase.getBeaconById(result.objectId, function(beacon) {
              // Send the new beacon to all recipients
              _.forEach(request.payload.recipientIds, function(recipientId) {
                console.log('Sending new beacon to recipient: ', recipientId);
                sioServer.to(recipientId).emit('newBeacon', beacon);
              });

              // And send it back to the sender as well
              sioServer.to(request.payload.senderId).emit('newBeacon', beacon);

              // TODO: Test this (should I break up this method?)
              reply({
                status: 'ok',
                newBeaconId: beacon.id
              });
            });
          });
        }
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

          var assistanceResponse = domain.createDomainMessage(request.payload.senderId, beacon, request.payload.contents);

          messageDatabase.saveMessage(assistanceResponse);

          // Right now this is being lazy and sending this message to ALL connected clients. It will be ignored by those
          // clients that don't contain the beacon, but this we should improve this in the future.
          sioServer.sockets.emit('assistanceResponse', assistanceResponse);

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

          // Right now this is being lazy and sending this message to ALL connected clients. It will be ignored by those
          // clients that don't contain the beacon, but this we should improve this in the future.
          sioServer.sockets.emit('acceptedAssistance', acceptResponseMessage);

          replySuccess(reply);
        });
      },
      app: {
        name: 'beacon'
      }
    }
  }
};
