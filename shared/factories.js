"use strict";

var BeaconFactory = function() {
  return {
    beacon: {
      responses: [],
      acceptedAssistance: []
    },
    withId: function(id) {
      this.beacon.id = id;
      return this;
    },
    withSenderId: function(senderId) {
      this.beacon.senderId = senderId;
      return this;
    },
    withSummaryText: function(title, description) {
      this.beacon.title = title;
      this.beacon.description = description;
      return this;
    },
    withLocation: function(latitude, longitude) {
      this.beacon.lat = latitude;
      this.beacon.lng = longitude;
      return this;
    },
    withResponse: function(response) {
      this.beacon.responses.push(response);
      return this;
    },
    withAcceptedOffer: function(acceptedOffer) {
      this.beacon.acceptedAssistance.push(acceptedOffer);
      return this;
    },
    createBeacon: function() {
      return this.beacon;
    }
  }
};

module.exports = {
  newBeaconFactory: function() {
    return new BeaconFactory();
  }
};
