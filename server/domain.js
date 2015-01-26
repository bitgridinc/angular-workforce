"use strict";

module.exports = {
  createBeacon: function(organization, title, description, lat, lng){
    var beacon = {
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
