"use strict";

describe('the service that authenticates a user and loads their organization profile', function() {
  var authenticationService;

  beforeEach(module('modules.providers'));
  beforeEach(inject(function(_AuthenticationService_) {
    authenticationService = _AuthenticationService_;
  }));

  describe('the authentication method', function() {
    it('should return a valid organization profile on success', function() {
      var organization = authenticationService.authenticate();
      expect(organization.name).toBeDefined();
    });
  });
});
