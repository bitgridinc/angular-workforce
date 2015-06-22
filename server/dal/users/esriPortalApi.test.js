"use strict";

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
