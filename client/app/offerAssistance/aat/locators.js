"use strict";

var offerAssistanceLocators = function() {
  this.assistButton = by.buttonText('Assist');
  this.declineButton = by.buttonText('Stuff \'Em');
  this.headerParagraph = by.id('bg-oa-header-paragraph');
  this.numRespondersInput = by.id('bg-oa-num-responders-input');
  this.arrivalDateInput = by.id('bg-oa-arrival-date');
  this.arrivalTimeInput = by.id('bg-oa-arrival-time');
  this.usersContainer = by.id('bg-oa-users-container');
};

module.exports = offerAssistanceLocators;
