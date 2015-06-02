"use strict";

var controlLocators = function() {
  this.myBeaconsButton = by.id('dashboard-beacons-btn');
  this.selfIcon = by.id('dashboard-beacons-self-icon');
  this.rightArrowIcon = by.id('dashboard-beacons-right-arrow');
  this.leftControlDiv = by.id('left-control');
};

module.exports = controlLocators;
