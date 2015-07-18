"use strict";

var sut = require('../api')({})
  , factories = require('../../../../shared/factories')
  , environment = require('../../../environment')
  , hapifyPost = require('../../../spec/support/hapiHelpers').hapifyPost;

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
          .withRequired('yk7EooUDkOKQA9zj', 'Murfreesboro Title', 'Murfreesboro Description', 1, 2)
          .withNumberOfPeople('4')
          .withRecipientIds(['b6038693-725d-4651-9a75-78fc202b1308', '9bf2989a-e6c9-48bd-b0b8-f20194fda10f'])
          .createBeaconPost();
    }); // Call createBeacon with a new beacon POST

    function testToExpectErrorAfter(testTitle, callback) {
      it(testTitle, function() {
        // Arrange
        callback();

        // Act by calling the handler directly
        sut.createBeacon.handler(hapifyPost(newBeaconPost), function(result) {
          // Assert
          expect(result.status).toBe('error');
        });
      });
    }

    testToExpectErrorAfter('should return an error if title is missing', function() { delete newBeaconPost.title; });
    testToExpectErrorAfter('should return an error if lat is missing', function() { newBeaconPost.lat = null; });
    testToExpectErrorAfter('should return an error if lng is missing', function() { delete newBeaconPost.lat; });
    testToExpectErrorAfter('should return an error if senderId is missing', function() { delete newBeaconPost.senderId; });
    testToExpectErrorAfter('should return an error if description is missing', function() { newBeaconPost.description = undefined; });
    testToExpectErrorAfter('should return an error if recipientIds are missing', function() { newBeaconPost.recipientIds = null; });
  });
});
