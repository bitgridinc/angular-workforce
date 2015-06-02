"use strict";

var reviewAssistanceLocators = function() {
  this.organizationCard = by.id('bg-ra-organization-card');
  this.contactCard = by.id('bg-ra-contact-card');
  this.organizationLabel = by.id('bg-ra-offer-summary');
  this.acceptButton = by.id('bg-ra-accept-button');
};

module.exports = reviewAssistanceLocators;
