"use strict";

var locators = new (require('./locators.js'))();

describe('trying to assist a non-existent beacon', function() {
  beforeEach(function() {
    browser.get('/#/dashboard/beacons/707/assist');
  });

  it('should display an error page', function() {
    expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/707/assist$');
    expect(element(locators.assistButton).isDisplayed()).toBeFalsy();
    expect(element(locators.declineButton).isDisplayed()).toBeFalsy();
  });
});
