"use strict";

var _ = require('lodash');

var BeaconFactory = function() {
  return {
    beacon: {
      responses: [],
      acceptedAssistance: []
    },
    withIds: function(id, senderId) {
      this.beacon.id = id;
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
    beaconPost: {
      recipientIds: []
    },
    withSenderId: function(senderId) {
      this.beaconPost.senderId = senderId;
      return this;
    },
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
    withNumberOfPeople: function(numberOfPeople) {
      this.beaconPost.numberOfPeople = numberOfPeople;
      return this;
    },
    withRecipientId: function(recipientId) {
      this.beaconPost.recipientIds.push(recipientId);
      return this;
    },
    withRecipientIds: function(recipientIds) {
      _.forEach.apply(this, recipientIds, function(recipientId) {
        this.withRecipientId(recipientId);
      });
      return this;
    },
    createBeaconPost: function() {
      return this.beaconPost;
    }
  }
};

var AssistanceResponseFactory = function() {
  return {
    assistanceResponse: {},
    withIds: function(id, senderId, beaconId) {
      this.assistanceResponse.id = id;
      this.assistanceResponse.senderId = senderId;
      this.assistanceResponse.beaconId = beaconId;
      return this;
    },
    withResponderCrew: function(numResponders, arrivalDate) {
      this.assistanceResponse.numResponders = numResponders;
      this.assistanceResponse.arrivalDate = arrivalDate;
      return this;
    },
    createAssistanceResponse: function() {
      return this.assistanceResponse;
    }
  }
};

module.exports = {
  newBeaconFactory: function() {
    return new BeaconFactory();
  },
  newBeaconPostFactory: function() {
    return new BeaconPostFactory();
  },
  newAssistanceResponseFactory: function() {
    return new AssistanceResponseFactory();
  }
};
