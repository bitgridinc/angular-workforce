"use strict";

module.exports = {
  runningInTestMode: function() {
    return process.env.mode === 'test';
  },
  changeToProductionMode: function() {
    delete process.env.mode;
  },
  changeToTestMode: function() {
    process.env.mode = 'test';
  }
};
