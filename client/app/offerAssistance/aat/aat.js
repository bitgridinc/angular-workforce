"use strict";

var offerAssistanceLocators = new (require('./locators.js'))();

describe('the offer assistance view', function() {
  beforeEach(function() {
    browser.get('/#/dashboard/beacons/30/assist');
  });

  // TODO: I'd like some way to ensure that there is a defined beacon in scope
  /*it('should display the name of the company you\'re offering to help', function() {
    expect(element(by.text('has requested')).isPresent()).toBeTruthy();
  });*/

  it('should navigate to the list of beacons when an offer is sent', function() {
    browser.findElement(offerAssistanceLocators.assistButton).click();
    expect(browser.getCurrentUrl()).not.toContain('/assist');
    expect(browser.getCurrentUrl()).not.toContain('/detail');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
    // TODO: Ensure something changes on the UI. This should not be checking whether the review offers button appears.
  });
});
