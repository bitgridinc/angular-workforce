"use strict";

var db = require('../esri/userDatabase/userDatabase')
  , environment = require('../environment.js');

describe('the user storage', function() {
  describe('when the aat env var is present', function() {
    beforeEach(function() {
      environment.changeToTestMode();
    });

    it('should return no users', function() {
      // Act by getting all users
      db.getAllUsers(function(users) {
        // Assert there are none
        expect(users.length).toBe(0);
      });
    });
  });
});
