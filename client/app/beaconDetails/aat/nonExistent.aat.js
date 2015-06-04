"use strict";

var locators = new (require('./locators.js'))();

describe('trying to view the details of a non-existent beacon', function() {
  beforeEach(function() {
    browser.get('/#/dashboard/beacons/707');
  });

  it('should display an error page', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/707');
    expect(browser.isElementPresent(locators.goBack)).toBeTruthy();
    expect(browser.isElementPresent(locators.summaryHeader)).toBeFalsy();
    expect(browser.isElementPresent(locators.offerAssistance)).toBeFalsy();
  });

  it('should provide a Go Back button to go back to the list of beacons', function() {
    browser.findElement(locators.goBack).click();
    expect(browser.getCurrentUrl()).not.toContain('/707');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
  });
});
