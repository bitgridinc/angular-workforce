"use strict";

var offerAssistanceLocators = function() {
  this.assistButton = by.buttonText('Assist');
  this.declineButton = by.buttonText('Stuff \'Em');
  this.toggleCalendarButton = by.id('bg-oa-toggle-calendar');
};

module.exports = offerAssistanceLocators;
