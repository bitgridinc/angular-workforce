"use strict";

var environment = require('../../../environment')
  , hapifyPost = require('../../../spec/support/hapiHelpers').hapifyPost
  , aatTestUser = require('../../../../shared/testConstants').aatTestUser
  , localTestUser = require('./esriCommon').testUser
  , generateTokenFake = require('./generateTokenFake')
  , portalSelfFake = require('./portalSelfFake')
  , proxyquire = require('proxyquire')
  , _ = require('lodash');

function createEsriPortalSpy() {
  var portalSpyObj = jasmine.createSpyObj('portal', ['self']);
  portalSpyObj.self.and.callFake(portalSelfFake);

  var esriPortalApiSpy = {
    portal: portalSpyObj,
    getToken: jasmine.createSpy('getToken').and.callFake(generateTokenFake)
  };

  return function() {
    return esriPortalApiSpy;
  };
}

function createCredentials(username, password) {
  return {
    username: username,
    password: password
  }
}

function generateEncodedJwtFromDomainToken(token) {
  return token.token + token.organization + token.fullName;
}
function createExpectedDomainToken() {
  return {
    fullName: localTestUser.fullName,
    organization: localTestUser.orgId,
    token: localTestUser.token
  };
}

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('spying on esri-portal-api', function() {

    var handlers;
    var jwtSpyObj;
    var esriPortalModuleFunction;
    beforeEach(function() {
      esriPortalModuleFunction = createEsriPortalSpy();

      // TODO: Move
      jwtSpyObj = jasmine.createSpyObj('jwt', ['sign']);
      jwtSpyObj.sign.and.callFake(generateEncodedJwtFromDomainToken);

      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      handlers = proxyquire('../api', {
        'esri-portal-api': esriPortalModuleFunction,
        'jsonwebtoken': jwtSpyObj
      });
    }); // Instantiate the SUT with spies for the esri-portal-api and jsonwebtoken modules

    describe('the login API', function() {
      describe('with successful auth', function() {
        var validCredentials;
        beforeEach(function() {
          // Arrange
          validCredentials = createCredentials(localTestUser.username, localTestUser.password);
        });

        it('should generate a valid jsonwebtoken when the Esri credentials are valid', function() {
          // Act
          handlers.login.handler(hapifyPost(validCredentials), function() { });

          // Assert
          expect(jwtSpyObj.sign).toHaveBeenCalledWith(createExpectedDomainToken(), 'secret');
        });
        it('should return the generated jsonwebtoken to the client if auth was successful', function() {
          // Act
          handlers.login.handler(hapifyPost(validCredentials), function(serverResponse) {
            // Assert
            expect(serverResponse).toEqual({
              token: generateEncodedJwtFromDomainToken(createExpectedDomainToken())
            });
          });
        });
      });
      it('should return a descriptive error if auth failed', function() {
        // Arrange (this doubles to ensure we can't login with the test credentials while in production mode)
        var invalidCredentials = createCredentials(aatTestUser.username, aatTestUser.password);

        // Act
        handlers.login.handler(hapifyPost(invalidCredentials), function(serverResponse) {
          // Assert
          expect(serverResponse).toEqual({
            error: {
              message: 'Invalid username or password.'
            }
          });
        });
      });
    });
  });
});
