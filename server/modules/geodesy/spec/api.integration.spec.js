"use strict";

var environment = require('../../../environment')
  , hapifyPost = require('../../../spec/support/hapiHelpers').hapifyPost
  , handlers = require('../api');

describe('the geodesy API (prod)', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  it('should properly convert 38.598, -77.036 to 18SUH2269774133', function() {
    // Arrange
    var postPayload = {
      lat: 38.598,
      lng: -77.036
    };
    var reply = jasmine.createSpy();

    // Act
    handlers.latLngToUsng.handler(hapifyPost(postPayload), reply);

    // Assert
    expect(reply).toHaveBeenCalledWith({
      usng: '18SUH2269774133'
    });
  });
});
