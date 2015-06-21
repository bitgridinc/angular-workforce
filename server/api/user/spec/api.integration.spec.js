"use strict";

var proxyquire = require('proxyquire')
  , specData = require('./api.integration.specData.js')
  , jwtDecodeFake = require('./jwtDecodeFake.js')
  , promiseHelpers = require('../../../spec/support/promiseHelpers')
  , environment = require('../../../environment');

describe('in production,', function() {
  var mode;
  beforeEach(function() {
    mode = environment.getCurrentMode();
    environment.changeToProductionMode();
  }); // Ensure each test runs in production mode
  afterEach(function() {
    environment.changeToMode(mode);
  }); // Reset back to whatever the mode was before the test was run

  describe('spying on esri-portal-api and jsonwebtoken', function() {
    var esriPortalModuleFunction;
    beforeEach(function() {
      var portalSpyObj = jasmine.createSpyObj('portal', ['users']);
      portalSpyObj.users.and.returnValue(promiseHelpers.createFake(specData.getAllUsersResponse));
      var esriPortalApiSpy = {
        portal: portalSpyObj
      };
      esriPortalModuleFunction = function() {
        return esriPortalApiSpy;
      };
    }); // Spy on the esri-portal-api module, which we use in userDatabase.js to communicate with Esri's portal API

    var jwtSpyObj;
    beforeEach(function() {
      jwtSpyObj = jasmine.createSpyObj('jwt', ['decode']);
      jwtSpyObj.decode.and.callFake(jwtDecodeFake.fakeFunction);
    });

    var handlers;
    beforeEach(function() {
      // Proxyquire recommends I don't do this, but it's required for an integration test. I'm proxying a require many
      // levels down, and proxyquire only goes one level deep by default (it's normally used for unit testing). See:
      // https://www.npmjs.com/package/proxyquire#caveat
      esriPortalModuleFunction['@global'] = true;

      // We must create the spies before we require in the api, as it is in the api's require statements that the
      // code in which we are spying is used
      handlers = proxyquire('../api', {
        'esri-portal-api': esriPortalModuleFunction,
        'jsonwebtoken': jwtSpyObj
      });
    }); // Instantiate our api, the SUT, with the spies set up above

    describe('the getAllUsers API', function() {
      it('should pass Esri users to the Hapi reply function', function() {
        // Arrange
        var replySpy = jasmine.createSpy('reply');
        var request = {
          query: {
            jwt: jwtDecodeFake.expectedJwt
          }
        };

        // Act
        handlers.getAllUsers.handler(request, replySpy);

        // Assert
        expect(replySpy.calls.allArgs()[0][0].users.length).toBe(specData.getAllUsersResponse.users.length);
      });
    });
  });
});
