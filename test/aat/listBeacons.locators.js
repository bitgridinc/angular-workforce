"use strict";

var listBeaconsLocators = function() {
  this.createBeaconButton = by.buttonText('Create Beacon');
  this.beaconSummaryDirective = by.css('beacon-summary');
};

module.exports = listBeaconsLocators;
