"use strict";

var CreateBeaconLocators = require('./locators.js');
var ListBeaconsLocators = require('../../listBeacons/aat/locators.js');

describe('the page used to create a new beacon', function() {
  var ptor,
      createBeaconLocators,
      listBeaconsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    createBeaconLocators = new CreateBeaconLocators();
    listBeaconsLocators = new ListBeaconsLocators();
  });

  it('should allow for the creation of a new beacon', function() {
    // Arrange - count existing beacons and select the button to create a new one
    ptor.get('/#/dashboard/beacons');
    var oldNumBeacons = element.all(listBeaconsLocators.beaconSummaryDirective).count();
    ptor.findElement(listBeaconsLocators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/create');

    // Act - create a new beacon
    ptor.findElement(createBeaconLocators.titleInput).sendKeys('Fix The BitGrid');
    ptor.findElement(createBeaconLocators.descriptionInput).sendKeys('At My House');
    ptor.findElement(createBeaconLocators.streetAddressInput).sendKeys('2729 Merrilee Drive');
    ptor.findElement(createBeaconLocators.cityInput).sendKeys('Fairfax');
    ptor.findElement(createBeaconLocators.numberOfPeopleInput).sendKeys('1')
      .then(function() {
        ptor.findElement(createBeaconLocators.submitButton).click();
      });

    // Assert - ensure we're back at the list of beacons and the new one is there
    expect(browser.getCurrentUrl()).not.toContain('/create');

    // Promises are weird. If I place the call to element.all in the then function, it doesn't work.
    var newNumBeacons = element.all(listBeaconsLocators.beaconSummaryDirective).count();
    oldNumBeacons.then(function(oldNumBeaconCount) {
      expect(newNumBeacons).toBe(oldNumBeaconCount + 1);
    });
  });
});
