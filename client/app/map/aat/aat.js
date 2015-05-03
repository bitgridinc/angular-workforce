"use strict";

var Locators = require('./locators.js');

describe('the map', function() {
  var ptor,
      locators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard');
  });
  beforeEach(function() {
    locators = new Locators();
  });

  it('should have loaded tiles visible', function() {
    // TODO: Can I instruct protractor to wait x ms until this className becomes available, then fail?
    browser.driver.sleep(2000);
    expect(ptor.isElementPresent(locators.mapLayers)).toBeTruthy();
  });
});
