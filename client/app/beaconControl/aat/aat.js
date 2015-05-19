"use strict";

var BeaconControlLocators = require('./locators.js')
  , ListBeaconsLocators = require('../../listBeacons/aat/locators.js');

describe('the main dashboard', function() {
  var beaconControlLocators
    , listBeaconsLocators;

  beforeEach(function() {
    beaconControlLocators = new BeaconControlLocators();
    listBeaconsLocators = new ListBeaconsLocators();
  });

  it('should open and close the list of beacons when the My Beacons button is clicked', function() {
    // Arrange
    browser.get('/#/dashboard');

    // Act/Assert for the first click
    browser.findElement(beaconControlLocators.myBeaconsButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
    expect(browser.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeTruthy();

    // Act/Assert for the second click
    browser.findElement(beaconControlLocators.myBeaconsButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    expect(browser.getCurrentUrl()).not.toContain('/#/dashboard/beacons');
    expect(browser.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
  });
});