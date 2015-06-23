"use strict";

var locators = new (require('./locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.browserGetWrapper('the map', function(testRunner) {
  testRunner('/#/dashboard', 'should have loaded tiles visible', function() {
    // TODO: Can I instruct protractor to wait x ms until this className becomes available, then fail?
    // TODO: Consider Expected Conditions: http://angular.github.io/protractor/#/api?view=ExpectedConditions
    browser.driver.sleep(2000);
    expect(browser.isElementPresent(locators.mapLayers)).toBeTruthy();
  });
});
