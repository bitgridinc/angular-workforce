"use strict";

var _ = require('lodash');

var BeaconFactory = function() {
  return {
    beacon: {
      title: 'title',
      description: 'description',
      lat: 0,
      lng: 0,
      streetAddress: 'streetAddress',
      numberOfPeople: 'numberOfPeople',
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
    withAddress: function(streetAddress) {
      this.beacon.streetAddress = streetAddress;
      return this;
    },
    withNumberOfPeople: function(numberOfPeople) {
      this.beacon.numberOfPeople = numberOfPeople;
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
      if (!this.beacon.hasOwnProperty('id')) {
        throw new Error('number is required');
      } else if (!this.beacon.hasOwnProperty('senderId')) {
        throw new Error('senderId is required');
      }

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
    withAddress: function(streetAddress) {
      this.beaconPost.streetAddress = streetAddress;
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
      _.forEach(recipientIds, function(recipientId) {
          this.withRecipientId(recipientId);
        }, this);
      return this;
    },
    createBeaconPost: function() {
      return this.beaconPost;
    }
  }
};

var AssistanceResponseFactory = function() {
  return {
    assistanceResponse: {
      numResponders: 'numResponders',
      arrivalDate: new Date()
    },
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
      if (!this.assistanceResponse.hasOwnProperty('id')) {
        throw new Error('number is required');
      } else if (!this.assistanceResponse.hasOwnProperty('senderId')) {
        throw new Error('senderId is required');
      } else if (!this.assistanceResponse.hasOwnProperty('beaconId')) {
        throw new Error('beaconId is required');
      }

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
