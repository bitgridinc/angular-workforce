"use strict";

var locators = new (require('./locators.js'))();

describe('the header', function() {
  beforeEach(function() {
    browser.get('/#/dashboard');
  });

  it('should display the utility name', function() {
    expect(element(locators.leftText).getText()).toMatch('as Morristown Utility Systems$');
  });
  it('should display a link that the user can click to view their profile', function() {
    browser.findElement(locators.myProfile).click();
    expect(browser.getCurrentUrl()).toMatch('/#/profile$');
  });
});