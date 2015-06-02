"use strict";

var createBeaconLocators = function() {
  this.submitButton = by.buttonText('Submit Beacon');
  this.titleInput = by.id('bg-cb-title-input');
  this.descriptionInput = by.id('bg-cb-description-input');
  this.streetAddressInput = by.id('bg-cb-street-address-input');
  this.zipInput = by.id('bg-cb-zip-input');
  this.numberOfPeopleInput = by.id('bg-cb-num-people-input');
};

module.exports = createBeaconLocators;
