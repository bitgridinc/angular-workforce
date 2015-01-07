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

  it('should have a marker visible', function() {
    expect(ptor.isElementPresent(locators.marker)).toBeTruthy();
  });
});
