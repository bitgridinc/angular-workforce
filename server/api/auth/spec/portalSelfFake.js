"use strict";

var promiseHelpers = require('../../../spec/support/promiseHelpers')
  , esriCommon = require('./esriCommon')
  , testUser = esriCommon.testUser;

// Mimics a small subset of the Esri API found at /sharing/rest/portals/self
module.exports = function(token) {
  if (token === testUser.token) {
    return promiseHelpers.createFake({
      user: {
        fullName: testUser.fullName,
        orgId: testUser.orgId
      }
    });
  }

  var errorResponse = esriCommon.createErrorResponse(498, 'Invalid token.');
  return promiseHelpers.createFake(errorResponse);
};
