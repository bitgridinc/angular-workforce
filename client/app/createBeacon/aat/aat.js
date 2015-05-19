"use strict";

var CreateBeaconLocators = require('./locators.js')
  , ListBeaconsLocators = require('../../listBeacons/aat/locators.js');

describe('the page used to create a new beacon', function() {
  var createBeaconLocators
    , listBeaconsLocators;

  beforeEach(function() {
    createBeaconLocators = new CreateBeaconLocators();
    listBeaconsLocators = new ListBeaconsLocators();
  });

  it('should allow for the creation of a new beacon', function() {
    // Arrange - count existing beacons and select the button to create a new one
    browser.get('/#/dashboard/beacons');
    browser.findElement(listBeaconsLocators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/create');

    // Act - create a new beacon
    browser.findElement(createBeaconLocators.titleInput).sendKeys('Fix The BitGrid');
    browser.findElement(createBeaconLocators.descriptionInput).sendKeys('At My House');
    browser.findElement(createBeaconLocators.streetAddressInput).sendKeys('2729 Merrilee Drive');
    browser.findElement(createBeaconLocators.cityInput).sendKeys('Fairfax');
    browser.findElement(createBeaconLocators.numberOfPeopleInput).sendKeys('1')
      .then(function() {
        browser.findElement(createBeaconLocators.submitButton).click();
      });

    // Assert - ensure we're back at the list of beacons and the new one is there
    expect(browser.getCurrentUrl()).not.toContain('/create');
  });
});
