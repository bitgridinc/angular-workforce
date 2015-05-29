"use strict";

var db = require('../esri/userDatabase/userDatabase')
  , environment = require('../environment.js');

describe('in test,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToTestMode();
  }); // Ensure each test runs in test mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('the user storage', function() {
    // Hitting the user storage breaks our AATs, so this test ensures we shortcut and return no users - at least until we
    // have a more well-defined user storage module.
    it('should return no users because a REST call to Esri will break our AATs', function() {
      // Act by getting all users
      db.getAllUsers(function(users) {
        // Assert there are none
        expect(users.length).toBe(0);
      });
    });
  });
});
