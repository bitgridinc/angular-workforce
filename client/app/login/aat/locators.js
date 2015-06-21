"use strict";

var loginLocators = function() {
  this.usernameInput = by.id('bg-lg-username');
  this.passwordInput = by.id('bg-lg-password');
  this.submitButton = by.id('bg-lg-submit');
};

module.exports = loginLocators;
