"use strict";

var OfferAssistanceLocators = require('./locators.js');

describe('the offer assistance view', function() {
  var ptor,
      offerAssistanceLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/assist');
  });

  beforeEach(function() {
    offerAssistanceLocators = new OfferAssistanceLocators();
  });

  // TODO: I'd like some way to ensure that there is a defined beacon in scope
  /*it('should display the name of the company you\'re offering to help', function() {
    expect(element(by.text('has requested')).isPresent()).toBeTruthy();
  });*/

  it('should have a button to send the offer of assistance', function() {
    ptor.findElement(offerAssistanceLocators.assistButton).click();
    expect(browser.getCurrentUrl()).not.toContain('/assist');
    expect(browser.getCurrentUrl()).not.toContain('/detail');
    // TODO: Ensure it shows up on the UI
  });
});
