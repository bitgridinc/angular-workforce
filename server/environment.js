"use strict";

module.exports = {
  getCurrentMode: function() {
    // TODO: Be more consistent and strict in my usage of mode/environment. Why can production mode be 'prod' or undefined?
    return process.env.mode;
  },
  runningInTestMode: function() {
    return process.env.mode === 'test';
  },
  changeToProductionMode: function() {
    delete process.env.mode;
  },
  changeToTestMode: function() {
    process.env.mode = 'test';
  },
  changeToMode: function(mode) {
    process.env.mode = mode;
  }
};
