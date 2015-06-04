"use strict";

var sut = require('../api')({})
  , factories = require('../../shared/factories')
  , environment = require('../environment')
  , _ = require('lodash');

function hapifyRequest(payload) {
  return {
    payload: payload
  }
}

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('the createBeacon API', function() {
    var newBeaconPost;
    beforeEach(function() {
      // Arrange a request to the API to create a new beacon
      newBeaconPost =
        factories.newBeaconPostFactory()
          .withSenderId('7a95759f-3df8-4f16-bb43-24f4329fe3df')
          .withSummaryText('Murfreesboro Title', 'Murfreesboro Description')
          .withNumberOfPeople('4')
          .withLocation(1, 2)
          .withRecipientIds(['b6038693-725d-4651-9a75-78fc202b1308', '9bf2989a-e6c9-48bd-b0b8-f20194fda10f'])
          .createBeaconPost();

    }); // Call createBeacon with a new beacon POST

    it('should return an error if title, numberOfPeople, lat, and lng are missing', function() {
      // Arrange the missing properties
      delete newBeaconPost.title;
      newBeaconPost.numberOfPeople = undefined;
      newBeaconPost.lat = null;
      delete newBeaconPost.lat;

      // Act by calling the handler directly
      sut.createBeacon.handler(hapifyRequest(newBeaconPost), function(result) {
        // Assert
        expect(result.status).toBe('error');
      });
    });
    it('should return an error if senderId, description, and recipientIds are missing', function() {
      // Arrange the missing properties
      delete newBeaconPost.senderId;
      newBeaconPost.description = undefined;
      newBeaconPost.recipientIds = null;

      // Act by calling the handler directly
      sut.createBeacon.handler(hapifyRequest(newBeaconPost), function(result) {
        // Assert
        expect(result.status).toBe('error');
      });
    });
  });
});
