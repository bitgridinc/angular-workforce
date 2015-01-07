"use strict";

var beaconDetailsLocators = function() {
  this.summaryHeader = by.css('beacon-summary');
  this.latitude = by.binding('selectionState.currentBeacon.lat');
  this.longitude = by.binding('selectionState.currentBeacon.lng');
  this.offerAssistance = by.buttonText('Offer Assistance');
  this.goBack = by.buttonText('Go Back');
};

module.exports = beaconDetailsLocators;
