"use strict";

var ControlLocators = require('./control.locators.js');
var ListBeaconsLocators = require('../../listBeacons/aat/listBeacons.locators.js');

describe('the main dashboard', function() {
  var ptor,
      controlLocators,
      listBeaconsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    controlLocators = new ControlLocators();
    listBeaconsLocators = new ListBeaconsLocators();
  });

  it('should open the list of beacons when the My Beacons button is clicked', function() {
    // Arrange
    ptor.get('/#/dashboard');

    // Act
    ptor.findElement(controlLocators.myBeaconsButton).click();

    // Assert
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    expect(ptor.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeTruthy();
  });
  it('should close the list of beacons when the My Beacons button is clicked again', function() {
    // Arrange
    ptor.get('/#/dashboard/mycompany');

    // Act
    ptor.findElement(controlLocators.myBeaconsButton).click();

    // Assert
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    expect(browser.getCurrentUrl()).not.toContain('mycompany');
    expect(ptor.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
  });
});