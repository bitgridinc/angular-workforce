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

var BeaconPostFactory = function() {
  return {
    beaconPost: {},
    withSummaryText: function(title, description) {
      this.beaconPost.title = title;
      this.beaconPost.description = description;
      return this;
    },
    withLocation: function(latitude, longitude) {
      this.beaconPost.lat = latitude;
      this.beaconPost.lng = longitude;
      return this;
    },
    createBeaconPost: function() {
      return this.beaconPost;
    }
  }
};

module.exports = {
  newBeaconFactory: function() {
    return new BeaconFactory();
  },
  newBeaconPostFactory: function() {
    return new BeaconPostFactory();
  }
};