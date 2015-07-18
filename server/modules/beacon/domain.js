"use strict";

var uuid = require('node-uuid')
  , factories = require('../../../shared/factories');

module.exports = {
  createDomainBeacon: function(payload){
    var newBeacon = factories.newBeaconFactory()
                    // id will be automatically assigned by db
                    // TODO: is id a required property then?
                    .withRequired(-1, payload.senderId, payload.title, payload.description, payload.lat, payload.lng)
                    .withAddress(payload.streetAddress, payload.zip)
                    .withDate(new Date(payload.startDate))
                    .withNumberOfPeople(payload.numberOfPeople);
    return newBeacon.createBeacon();
  },
  createDomainMessage: function(senderId, beacon, offerContents){
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
