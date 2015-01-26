"use strict";

var uuid = require('node-uuid');

module.exports = {
  createBeacon: function(organization, contents){
    var beaconId = uuid.v4();
    var beacon = {
      id: beaconId,
      organization: organization,
      title: contents.title,
      description: contents.description,
      lat: contents.lat,
      lng: contents.lng,
      responses: [],
      acceptedAssistance: []
    };
    return beacon;
  }
};
