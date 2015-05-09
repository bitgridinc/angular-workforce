"use strict";

var Locators = require('./locators.js');

describe('trying to assist a non-existent beacon', function() {
  var ptor
    , locators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons/707/assist');
  });

  beforeEach(function() {
    locators = new Locators();
  });

  it('should display an error page', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/707/assist');
    expect(element(locators.assistButton).isDisplayed()).toBeFalsy();
    expect(element(locators.declineButton).isDisplayed()).toBeFalsy();
  });
});
