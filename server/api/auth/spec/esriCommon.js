"use strict";

module.exports = {
  testUser: {
    username: 'user',
    password: 'pass',
    fullName: 'test name',
    token: 'token123',
    orgId: 'org123'
  },
  createErrorResponse: function(code, message) {
    return {
      error: {
        code: code,
        message: message,
        details: []
      }
    }
  }
};
