"use strict";

var uuid = require('node-uuid');

module.exports = {
  createBeacon: function(senderId, contents){
    var beaconId = uuid.v4();
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
  }
};
