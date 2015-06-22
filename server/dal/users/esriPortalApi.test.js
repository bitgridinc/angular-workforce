"use strict";

// Stubbed Esri portal API when running in test mode
module.exports = {
  portal: {
    users: function(accessToken, param) {
      return {
        then: function(callback) {
          callback([]);
        }
      };
    }
  }
};
