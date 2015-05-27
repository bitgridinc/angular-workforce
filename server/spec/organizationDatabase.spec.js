"use strict";

var db = require('../inMemory/organizations/organizationDatabase')
  , environment = require('../environment.js');

describe('the organization database', function() {
  describe('when in production mode', function() {
    beforeEach(function() {
      environment.changeToProductionMode();
    });

    it('should initialize with 4 organizations defined', function() {
      expect(db.getAllOrganizations().length).toBe(4);
    });
    it('should return a different organization on each call', function() {
      // Act by calling getCurrentOrganization twice
      var firstCallOrganization = db.getCurrentOrganization();
      var secondCallOrganization = db.getCurrentOrganization();

      // Assert that they are the same
      expect(firstCallOrganization).not.toBe(secondCallOrganization);
    });
  });
});
