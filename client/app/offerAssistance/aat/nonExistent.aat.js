"use strict";

var locators = new (require('./locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.authenticationRequiredWrapper('the offer assistance view', function(testRunner) {
  testRunner('/#/dashboard/beacons/707/assist', 'should display an error page on a non-existent beacon', function() {
    expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/707/assist$');
    expect(element(locators.assistButton).isDisplayed()).toBeFalsy();
    expect(element(locators.declineButton).isDisplayed()).toBeFalsy();
  });
});
