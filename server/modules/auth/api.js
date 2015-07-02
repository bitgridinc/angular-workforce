"use strict";

var domain = require('./domain')
  , aatTestUser = require('./../../../shared/testConstants').aatTestUser
  , environment = require('../../environment.js')
  , organizationBackingData = require('../../dal/organizations/organizationDatabase.backingData')
  , ago = new (require('esri-portal-api'))()
  , jwt = require('jsonwebtoken')
  , _ = require('lodash');

function createSuccessResponseJwt(userData, accessToken) {
  return {
    token: jwt.sign(domain.createSuccessResponse(userData.fullName, userData.orgId, accessToken), 'secret')
  }
}

function createErrorResponse() {
  return {
    error: {
      message: 'Invalid username or password.'
    }
  }
}

module.exports = {
  login: {
    handler: function(request, reply) {
      if (environment.runningInTestMode()) {
        if (request.payload.username === aatTestUser.username &&
            request.payload.password === aatTestUser.password) {
          reply(createSuccessResponseJwt({
            orgId: organizationBackingData.organizations[1].id,
            fullName: aatTestUser.fullName
          }, 'testtoken'));
        } else {
          reply(createErrorResponse());
        }
      } else {
        ago.getToken(request.payload.username, request.payload.password, {}).then(function(getTokenResult) {
          var accessToken = getTokenResult.token;
          if (accessToken) {
            ago.portal.self(accessToken).then(function(portalSelfResult) {
              reply(createSuccessResponseJwt(portalSelfResult.user, accessToken));
            });
          } else {
            reply(createErrorResponse());
          }
        });
      }
    },
    app: {
      name: 'login'
    }
  }
};
