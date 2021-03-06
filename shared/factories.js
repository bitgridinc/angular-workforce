"use strict";

var factories = {
  newBeaconFactory: function() {
    var beacon = {
      title: 'title',
      description: 'description',
      lat: 0,
      lng: 0,
      responses: [],
      acceptedAssistance: []
    };
    return {
      withRequired: function(id, senderId, title, description, lat, lng) {
        beacon.id = id;
        beacon.senderId = senderId;
        beacon.title = title;
        beacon.description = description;
        beacon.lat = lat;
        beacon.lng = lng;
        return this;
      },
      withAddress: function(streetAddress, zip) {
        beacon.streetAddress = streetAddress;
        beacon.zip = zip;
        return this;
      },
      withDate: function(startDate) {
        beacon.startDate = startDate;
        return this;
      },
      withNumberOfPeople: function(numberOfPeople) {
        beacon.numberOfPeople = numberOfPeople;
        return this;
      },
      withResponse: function(response) {
        beacon.responses.push(response);
        return this;
      },
      withAcceptedOffer: function(acceptedOffer) {
        beacon.acceptedAssistance.push(acceptedOffer);
        return this;
      },
      createBeacon: function() {
        if (!beacon.hasOwnProperty('id')) {
          throw new Error('number is required');
        } else if (!beacon.hasOwnProperty('senderId')) {
          throw new Error('senderId is required');
        }

        return beacon;
      }
    };
  },
  newBeaconPostFactory: function() {
    var beaconPost = {
      senderId: 'senderId',
      title: 'title',
      description: 'description',
      lat: 0,
      lng: 0,
      recipientIds: []
    };
    return {
      withRequired: function(senderId, title, description, lat, lng) {
        beaconPost.senderId = senderId;
        beaconPost.title = title;
        beaconPost.description = description;
        beaconPost.lat = lat;
        beaconPost.lng = lng;
        return this;
      },
      withAddress: function(streetAddress, zip) {
        beaconPost.streetAddress = streetAddress;
        beaconPost.zip = zip;
        return this;
      },
      withDate: function(startDate) {
        beaconPost.startDate = startDate;
        return this;
      },
      withNumberOfPeople: function(numberOfPeople) {
        beaconPost.numberOfPeople = numberOfPeople;
        return this;
      },
      withRecipientId: function(recipientId) {
        beaconPost.recipientIds.push(recipientId);
        return this;
      },
      withRecipientIds: function(recipientIds) {
        if (Array.isArray(recipientIds)) {
          for (var i = 0; i < recipientIds.length; i++) {
            this.withRecipientId(recipientIds[i]);
          }
        }
        return this;
      },
      createBeaconPost: function() {
        return beaconPost;
      }
    };
  },
  newAssistanceResponseFactory: function() {
    var assistanceResponse = {};
    return {
      withIds: function(id, senderId, beaconId) {
        assistanceResponse.id = id;
        assistanceResponse.senderId = senderId;
        assistanceResponse.beaconId = beaconId;
        return this;
      },
      withResponderCrew: function(numResponders, arrivalDate) {
        assistanceResponse.numResponders = numResponders;
        assistanceResponse.arrivalDate = arrivalDate;
        return this;
      },
      createAssistanceResponse: function() {
        return assistanceResponse;
      }
    };
  }
};

module.exports = factories;
