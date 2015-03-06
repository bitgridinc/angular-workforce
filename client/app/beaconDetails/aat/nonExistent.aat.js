"use strict";

var BeaconDetailsLocators = require('./locators.js');

describe('trying to view the details of a non-existent beacon', function() {
  var ptor,
      beaconDetailsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons/707');
  });

  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  it('should display an error page', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/707');
    expect(ptor.isElementPresent(beaconDetailsLocators.goBack)).toBeTruthy();
    expect(ptor.isElementPresent(beaconDetailsLocators.summaryHeader)).toBeFalsy();
    expect(ptor.isElementPresent(beaconDetailsLocators.offerAssistance)).toBeFalsy();
  });

  it('should provide a Go Back button to go back to the list of beacons', function() {
    ptor.findElement(beaconDetailsLocators.goBack).click();
    expect(browser.getCurrentUrl()).not.toContain('/707');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
  });
});
