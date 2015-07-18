"use strict";

var environment = require('../../environment');

module.exports.inProduction = function(testSuite) {
  describe('in production,', function() {
    var mode;
    beforeEach(function() {
      mode = environment.getCurrentMode();
      environment.changeToProductionMode();
    }); // Ensure each test runs in production mode
    afterEach(function() {
      environment.changeToMode(mode);
    }); // Reset back to whatever the mode was before the test was run

    testSuite();
  })
};
