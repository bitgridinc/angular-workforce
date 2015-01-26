"use strict";

var uuid = require('node-uuid');

module.exports = {
  createBeacon: function(organization, title, description, lat, lng){
    var beaconId = uuid.v4();
    var beacon = {
      id: beaconId,
      organization: organization,
      title: title,
      description: description,
      lat: lat,
      lng: lng,
      responses: [],
      acceptedAssistance: []
    };
    return beacon;
  }
};
