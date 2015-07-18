"use strict";

var db = require('../organizationDatabase')
  , inProduction = require('../../../spec/support/environmentHelpers').inProduction;

inProduction(function() {
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
