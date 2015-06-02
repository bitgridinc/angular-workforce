"use strict";

var createBeaconLocators = function() {
  this.submitButton = by.buttonText('Submit Beacon');
  this.titleInput = by.id('title');
  this.descriptionInput = by.id('description');
  this.streetAddressInput = by.id('streetAddress');
  this.zipInput = by.id('zip');
  this.numberOfPeopleInput = by.id('numberOfPeople');
};

module.exports = createBeaconLocators;
