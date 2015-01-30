"use strict";

var uuid = require('node-uuid'),
    _ = require('lodash'),
    factories = require('../shared/factories');

module.exports = {
  createBeacon: function(payload){
    return factories.newBeaconFactory()
      .withId(Math.floor(Math.random() * 10000))
      .withSenderId(payload.senderId)
      .withSummaryText(payload.title, payload.description)
      .withLocation(payload.lat, payload.lng)
      .createBeacon();
  },
  offerAssistance: function(senderId, beacon, offerContents){
    var offer = {
      id: uuid.v4(),
      numResponders: offerContents.numResponders,
      arrivalDate: offerContents.arrivalDate,
      senderId: senderId,
      beaconId: beacon.id
    };
    // TODO: Test this specifically
    beacon.responses.push(offer);
    return offer;
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
