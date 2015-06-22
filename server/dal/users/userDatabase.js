/* jslint node: true */
"use strict";

var testMode = require('../../environment.js').runningInTestMode()
  , ago = testMode ? require('./esriPortalApi.test') : new (require('esri-portal-api'))();

module.exports = {
  getAllUsers: function(accessToken) {
    console.log('Getting Esri users with token: ', accessToken);
    return ago.portal.users(accessToken, 'self');
  }
};
