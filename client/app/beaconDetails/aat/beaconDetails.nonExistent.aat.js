"use strict";

var BeaconDetailsLocators = require('./locators.js');

describe('trying to view the details of a non-existent beacon', function() {
  var ptor,
      beaconDetailsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons/detail/99999non-exis-tent-9999-999999999999');
  });

  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  it('should display an error page', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/99999non-exis-tent-9999-999999999999');
    expect(ptor.isElementPresent(beaconDetailsLocators.goBack)).toBeTruthy();
    expect(element(beaconDetailsLocators.summaryHeader).isDisplayed()).toBeFalsy();
    expect(element(beaconDetailsLocators.offerAssistance).isDisplayed()).toBeFalsy();
  });

  it('should provide a Go Back button to go back to the list of beacons', function() {
    ptor.findElement(beaconDetailsLocators.goBack).click();
    expect(browser.getCurrentUrl()).not.toContain('/detail/99999non-exis-tent-9999-999999999999');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
  });
});
