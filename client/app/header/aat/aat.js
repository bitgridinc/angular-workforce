"use strict";

var Locators = require('./locators.js');

describe('the header', function() {
  var ptor
    , locators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    locators = new Locators();
    ptor.get('/#/dashboard');
  });

  it('should display a link that the user can click to view their profile', function() {
    ptor.findElement(locators.myProfile).click();
    expect(browser.getCurrentUrl()).toContain('/#/profile');
  });
});