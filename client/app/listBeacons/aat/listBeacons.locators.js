"use strict";

var listBeaconsLocators = function() {
  this.createBeaconButton = by.buttonText('Create Beacon');
  this.beaconSummaryDirective = by.css('beacon-summary');
  this.reviewOffersButton = by.buttonText('Review Offers');
};

module.exports = listBeaconsLocators;
