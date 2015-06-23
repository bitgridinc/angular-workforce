"use strict";

var locators = new (require('./locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.browserGetWrapper('the beacon details view', function(testRunner, suiteRunner) {
  suiteRunner('/#/dashboard/beacons/707', 'on a non-existent beacon', function() {
    it('should display an error page', function() {
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/707$');
      expect(browser.isElementPresent(locators.goBack)).toBeTruthy();
      expect(browser.isElementPresent(locators.summaryHeader)).toBeFalsy();
      expect(browser.isElementPresent(locators.offerAssistance)).toBeFalsy();
    });

    it('should provide a Go Back button to go back to the list of beacons', function() {
      browser.findElement(locators.goBack).click();
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
    });
  });
});
