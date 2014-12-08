"use strict";

var beaconDetailsLocators = function() {
  this.selectBeacon = by.buttonText('Select Beacon 0');
  this.offerAssistance = by.buttonText('Offer Assistance');
  this.selectServices = by.buttonText('Select Services - false');
};

module.exports = beaconDetailsLocators;
