"use strict";

var BeaconControlLocators = require('./beaconControl.locators.js');
var ListBeaconsLocators = require('../../listBeacons/aat/listBeacons.locators.js');

describe('the main dashboard', function() {
  var ptor,
      beaconControlLocators,
      listBeaconsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    beaconControlLocators = new BeaconControlLocators();
    listBeaconsLocators = new ListBeaconsLocators();
  });

  it('should open the list of beacons when the My Beacons button is clicked', function() {
    // Arrange
    ptor.get('/#/dashboard');

    // Act
    ptor.findElement(beaconControlLocators.myBeaconsButton).click();

    // Assert
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
    expect(ptor.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeTruthy();
  });
  it('should close the list of beacons when the My Beacons button is clicked again', function() {
    // Arrange
    ptor.get('/#/dashboard/beacons');

    // Act
    ptor.findElement(beaconControlLocators.myBeaconsButton).click();

    // Assert
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    expect(browser.getCurrentUrl()).not.toContain('/#/dashboard/beacons');
    expect(ptor.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
  });
});