"use strict";

var db = require('../organizationDatabase')
  , environment = require('../../../environment.js');

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('the organization database', function() {
    it('should initialize with 4 organizations defined', function() {
      expect(db.getAllOrganizations().length).toBe(4);
    });
    it('should return an organization by id', function() {
      // Arrange
      var organizationId = 'xDhHwQjbGYzMADZo';

      // Act
      var organization = db.getCurrentOrganization(organizationId);

      // Assert
      expect(organization.name).toBe('Greeneville Light & Power System');
    });
  });
});
