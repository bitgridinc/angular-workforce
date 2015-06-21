/* jslint node: true */
"use strict";

var ago = new (require('esri-portal-api'))()
  , environment = require('../../environment.js');

module.exports = {
  getAllUsers: function(accessToken) {
    if (environment.runningInTestMode()) {
      console.log('getAllUsers returns empty in test mode');
      return {
        then: function(callback) {
          callback([]);
        }
      }
    }

    console.log('Getting Esri users with token: ', accessToken);
    return ago.portal.users(accessToken, 'self');
  }
};
