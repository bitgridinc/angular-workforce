"use strict";

var beaconDetailsLocators = function() {
  this.summaryHeader = by.id('bg-bd-beacon-summary');
  this.streetAddress = by.binding('selectionState.currentBeacon.streetAddress');
  this.numberOfPeople = by.binding('selectionState.currentBeacon.numberOfPeople');
  this.offerAssistance = by.buttonText('Offer Assistance');
  this.reviewOffers = by.buttonText('Review Offers');
  this.goBack = by.buttonText('Go Back');
  this.acceptedAssistanceRepeater = by.repeater('acceptedAssistance in selectionState.currentBeacon.acceptedAssistance');
};

module.exports = beaconDetailsLocators;
