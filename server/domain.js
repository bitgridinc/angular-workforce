"use strict";

var uuid = require('node-uuid'),
    _ = require('lodash'),
    factories = require('../shared/factories');

module.exports = {
  createBeacon: function(payload){
    return factories.newBeaconFactory()
      .withIds(Math.floor(Math.random() * 10000), payload.senderId)
      .withSummaryText(payload.title, payload.description)
      .withLocation(payload.lat, payload.lng)
      .withNumberOfPeople(payload.numberOfPeople)
      .createBeacon();
  },
  offerAssistance: function(senderId, beacon, offerContents){
    var assistanceResponse = factories.newAssistanceResponseFactory()
      .withIds(uuid.v4(), senderId, beacon.id)
      .withResponderCrew(offerContents.numResponders, offerContents.arrivalDate)
      .createAssistanceResponse();
    // TODO: Test this specifically
    beacon.responses.push(assistanceResponse);
    return assistanceResponse;
  },
  acceptAssistance: function(senderId, beacon, acceptedOfferId){
    // TODO: Test this specifically
    var response = _.remove(beacon.responses, function(response) {
      return response.id === acceptedOfferId;
    })[0];
    console.log('Accepting this offer:', response);
    beacon.acceptedAssistance.push(response);
    return response;
  }
};
