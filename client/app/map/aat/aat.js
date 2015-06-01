"use strict";

var locators = new (require('./locators.js'))();

describe('the map', function() {
  beforeEach(function() {
    browser.get('/#/dashboard');
  });

  it('should have loaded tiles visible', function() {
    // TODO: Can I instruct protractor to wait x ms until this className becomes available, then fail?
    browser.driver.sleep(2000);
    expect(browser.isElementPresent(locators.mapLayers)).toBeTruthy();
  });
});
