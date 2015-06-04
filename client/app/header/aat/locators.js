"use strict";

var headerLocators = function() {
  this.leftText = by.id('bg-hd-left-text');
  this.myProfile = by.linkText('My Profile');
};

module.exports = headerLocators;
