"use strict";

var BeaconControlLocators = require('./locators.js')
  , ListBeaconsLocators = require('../../listBeacons/aat/locators.js');

describe('the main dashboard', function() {
  var ptor
    , beaconControlLocators
    , listBeaconsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    beaconControlLocators = new BeaconControlLocators();
    listBeaconsLocators = new ListBeaconsLocators();
  });

  it('should open and close the list of beacons when the My Beacons button is clicked', function() {
    // Arrange
    ptor.get('/#/dashboard');

    // Act/Assert for the first click
    ptor.findElement(beaconControlLocators.myBeaconsButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
    expect(ptor.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeTruthy();

    // Act/Assert for the second click
    ptor.findElement(beaconControlLocators.myBeaconsButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    expect(browser.getCurrentUrl()).not.toContain('/#/dashboard/beacons');
    expect(ptor.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
  });
});