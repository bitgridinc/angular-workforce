"use strict";

var headerLocators = function() {
  this.myProfile = by.linkText('My Profile');
  this.login = by.linkText('Login');
};

module.exports = headerLocators;
