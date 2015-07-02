"use strict";

var expectedJwt = 'expectedtoken';

module.exports = {
  expectedJwt: expectedJwt,
  fakeFunction: function(jwt) {
    if (jwt === expectedJwt) {
      return {
        organization: 'orgId',
        token: 'token'
      }
    }
  }
};
