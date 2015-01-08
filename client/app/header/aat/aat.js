"use strict";

var Locators = require('./locators.js');

describe('the header', function() {
  var ptor,
      locators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    locators = new Locators();
  });

  it('should display a button that the user can click to view their profile', function() {
    ptor.get('/#/dashboard');
  });
  it('should still be visible in child states', function() {
    ptor.get('/#/dashboard/beacons');
  });

  afterEach(function() {
    ptor.findElement(locators.myProfile).click();
    expect(browser.getCurrentUrl()).toContain('/#/profile');
  });
});