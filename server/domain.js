"use strict";

var uuid = require('node-uuid'),
    _ = require('lodash');

module.exports = {
  createBeacon: function(senderId, contents){
    var beaconId = Math.floor(Math.random() * 10000);
    var beacon = {
      id: beaconId,
      senderId: senderId,
      title: contents.title,
      description: contents.description,
      lat: contents.lat,
      lng: contents.lng,
      responses: [],
      acceptedAssistance: []
    };
    return beacon;
  },
  offerAssistance: function(senderId, beacon, offerContents){
    var offer = {
      id: uuid.v4(),
      numResponders: offerContents.numResponders,
      arrivalDate: offerContents.arrivalDate
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
