"use strict";

var Locators = require('./map.locators.js');

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
    browser.driver.sleep(1000);
    expect(ptor.isElementPresent(locators.loadedTile)).toBeTruthy();
  });
  it('should have a marker visible', function() {
    expect(ptor.isElementPresent(locators.marker)).toBeTruthy();
  });
});
