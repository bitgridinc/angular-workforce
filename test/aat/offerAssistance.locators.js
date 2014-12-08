"use strict";

var offerAssistanceLocators = function() {
  this.assistButton = by.buttonText('Assist');
  this.declineButton = by.buttonText('Stuff \'Em');
};

module.exports = offerAssistanceLocators;
