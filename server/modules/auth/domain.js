"use strict";

module.exports = {
  createSuccessResponse: function(esriFullName, esriOrgId, esriAccessToken) {
    var token = {
      fullName: esriFullName,
      organization: esriOrgId,
      token: esriAccessToken
    };
    console.log('Token created: ', token);
    return token;
  }
};
