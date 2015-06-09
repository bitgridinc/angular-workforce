"use strict";

var locators = new (require('./locators.js'))();

describe('the map', function() {
  // Put this in every AAT suite
  afterEach(function() {
    // Will write out all warnings and errors at the end of each test
    browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        console.log(log.message);
      });
    });
  });

  beforeEach(function() {
    browser.get('/#/dashboard');
  });

  it('should have loaded tiles visible', function() {
    // TODO: Can I instruct protractor to wait x ms until this className becomes available, then fail?
    // TODO: Consider Expected Conditions: http://angular.github.io/protractor/#/api?view=ExpectedConditions
    browser.driver.sleep(2000);
    expect(browser.isElementPresent(locators.mapLayers)).toBeTruthy();
  });
});
