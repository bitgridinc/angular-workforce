"use strict";

var promiseHelpers = require('../../../spec/support/promiseHelpers')
  , esriCommon = require('./esriCommon')
  , testUser = esriCommon.testUser;

// Designed to perfectly mimic the Esri generateToken API at /sharing/generateToken
module.exports = function(username, password) {
  // Success case
  if (username === testUser.username && password === testUser.password) {
    return promiseHelpers.createFake({
      token: testUser.token,
      expires: 'sometime',
      ssl: false
    });
  }

  var errorResponse = esriCommon.createErrorResponse(400, 'Unable to generate token.');
  if (username && password) {
    errorResponse.error.details.push('Invalid username or password.');
  }
  else {
    if (!username) {
      errorResponse.error.details.push('\'username\' must be specified.');
    }
    if (!password) {
      errorResponse.error.details.push('\'password\' must be specified.');
    }
  }

  return promiseHelpers.createFake(errorResponse);
};
