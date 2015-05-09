"use strict";

var db = require('../esri/userDatabase/userDatabase');

describe('the user storage', function() {
  describe('when the aat env var is present', function() {
    beforeEach(function() {
      // Arrange the environment to use our hardcoded data instead of hitting ArcGIS Online
      process.env.aat = true;
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
