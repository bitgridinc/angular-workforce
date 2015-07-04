"use strict";

var environment = require('../../../environment')
  , hapifyPost = require('../../../spec/support/hapiHelpers').hapifyPost
  , handlers = require('../api');

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  it('should call reply', function() {
    // Arrange
    var reply = jasmine.createSpy();

    // Act
    handlers.login.handler(hapifyPost({}), reply);

    // Assert
    expect(reply).toHaveBeenCalled();
  });
});
