"use strict";

// Hapi provides the POST data in a payload property.
module.exports.hapifyPost = function(payload) {
  return {
    payload: payload
  }
};