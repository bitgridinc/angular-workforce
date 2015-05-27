"use strict";

var uuid = require('node-uuid')
  , _ = require('lodash')
  , factories = require('../shared/factories');

module.exports = {
  createBeacon: function(payload){
    return factories.newBeaconFactory()
                    .withIds(-1, payload.senderId) // id will be automatically assigned by db
                    .withSummaryText(payload.title, payload.description)
                    .withLocation(payload.lat, payload.lng)
                    .withAddress(payload.streetAddress)
                    .withNumberOfPeople(payload.numberOfPeople)
                    .createBeacon();
  },
  offerAssistance: function(senderId, beacon, offerContents){
    return factories.newAssistanceResponseFactory()
                    .withIds(uuid.v4(), senderId, beacon.id)
                    .withResponderCrew(offerContents.numResponders, offerContents.arrivalDate)
                    .createAssistanceResponse();
  },
  populateBeaconWithMessages: function(beacon, messages) {
    if (beacon.responses.length === 0 && beacon.acceptedAssistance.length === 0) {
      messages.forEach(function(message) {
        (message.accepted ? beacon.acceptedAssistance : beacon.responses).push(message);
      });
    }
  }
};
