"use strict";

var BeaconDetailsLocators = require('./locators.js');

describe('trying to view the details of a non-existent beacon', function() {
  var beaconDetailsLocators;

  beforeEach(function() {
    browser.get('/#/dashboard/beacons/707');
  });
  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  it('should display an error page', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/707');
    expect(browser.isElementPresent(beaconDetailsLocators.goBack)).toBeTruthy();
    expect(browser.isElementPresent(beaconDetailsLocators.summaryHeader)).toBeFalsy();
    expect(browser.isElementPresent(beaconDetailsLocators.offerAssistance)).toBeFalsy();
  });

  it('should provide a Go Back button to go back to the list of beacons', function() {
    browser.findElement(beaconDetailsLocators.goBack).click();
    expect(browser.getCurrentUrl()).not.toContain('/707');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
  });
});
