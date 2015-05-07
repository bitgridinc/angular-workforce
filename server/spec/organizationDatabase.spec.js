"use strict";

var db = require('../inMemory/organizations/organizationDatabase');

describe('the organization database', function() {
  describe('when the aat env var is not present', function() {
    beforeEach(function() {
      // Arrange the environment so that our aat env var is not present
      delete process.env.aat;
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

  describe('when the aat env var is present', function() {
    beforeEach(function() {
      // Arrange the environment to use our hardcoded data instead of hitting ArcGIS Online
      process.env.aat = true;
    });

    // This is necessary as I have code to switch the current organization for demo and hand-testing reasons
    it('should return the same organization on subsequent calls', function() {
      // Act by calling getCurrentOrganization twice
      var firstCallOrganization = db.getCurrentOrganization();
      var secondCallOrganization = db.getCurrentOrganization();

      // Assert that they are the same
      expect(firstCallOrganization).toBe(secondCallOrganization);
    });
    it('should not return the Murfreesboro organization as our AATs would fail', function() {
      // Act by getting the organization
      var organization = db.getCurrentOrganization();

      // Assert
      expect(organization.name).not.toContain('Murfreesboro');
    });
  });
});
