"use strict";

var Locators = require('./locators.js');

describe('the header', function() {
  var ptor,
      locators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    locators = new Locators();
  });

  // I'm no longer displaying the header, at least until we give the demo.
  /*it('should display a button on every page that the user can click to view their profile', function() {
    ptor.get('/#/dashboard');
    ptor.findElement(locators.myProfile).click();
    expect(browser.getCurrentUrl()).toContain('/#/profile');

    ptor.get('/#/dashboard/beacons');
    ptor.findElement(locators.myProfile).click();
    expect(browser.getCurrentUrl()).toContain('/#/profile');
  });*/

  // TODO: Add a test against the currently signed in as <value> text.
});