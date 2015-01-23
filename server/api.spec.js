"use strict";

var controllers = require('./api');

describe('the create beacon API method', function() {
  it('should exist', function() {
    expect(controllers.createBeacon).toBeDefined();
  });
});
