"use strict";

var listBeaconsLocators = function() {
  this.createBeaconButton = by.buttonText('Create Beacon');
  this.beaconSummaryDirective = by.id('beacon-summary');
};

module.exports = listBeaconsLocators;
