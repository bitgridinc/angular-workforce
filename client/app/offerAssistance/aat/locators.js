"use strict";

var offerAssistanceLocators = function() {
  this.assistButton = by.buttonText('Assist');
  this.declineButton = by.buttonText('Stuff \'Em');
  this.headerParagraph = by.id('bg-oa-header-paragraph');
  this.numRespondersInput = by.id('bg-oa-num-responders-input');
  this.dateInput = by.id('bg-oa-date-input');
  this.toggleCalendarButton = by.id('bg-oa-toggle-calendar');
  this.calendarTodayButton = by.buttonText('Today');
};

module.exports = offerAssistanceLocators;
