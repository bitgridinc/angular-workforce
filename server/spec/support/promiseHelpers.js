"use strict";

module.exports = {
  createFake: function(returnValue) {
    return {
      then: function(callback) {
        return callback(returnValue);
      }
    }
  }
};
