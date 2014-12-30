"use strict";

var beaconDetailsLocators = function() {
  this.selectBeacon = by.css('beacon-summary');
  this.offerAssistance = by.buttonText('Offer Assistance');
  this.goBack = by.buttonText('Go Back');
};

module.exports = beaconDetailsLocators;
