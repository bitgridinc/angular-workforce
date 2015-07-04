"use strict";

var environment = require('../../../environment')
  , hapifyPost = require('../../../spec/support/hapiHelpers').hapifyPost
  , proxyquire = require('proxyquire');

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  var handlers;
  beforeEach(function() {
    // We must create the spies before we require in the api, as it is in the api's require statements that the
    // code in which we are spying is used
    handlers = proxyquire('../api', {});
  }); // Instantiate our api, the SUT, with the spies set up above

  it('should reply an empty object', function() {
    var reply = jasmine.createSpy();

    // Act
    handlers.login.handler(hapifyPost({}), reply);

    // Assert
    expect(reply).toHaveBeenCalled();
  });
});
