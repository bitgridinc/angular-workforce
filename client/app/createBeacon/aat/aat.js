"use strict";

var createBeaconLocators = new (require('./locators.js'))()
  , listBeaconsLocators = new (require('../../listBeacons/aat/locators.js'))();

function clickSubmitBeaconButton() {
  browser.findElement(createBeaconLocators.submitButton).click();
}
function acceptAlertDialog() {
  var alertDialog = browser.switchTo().alert();
  alertDialog.accept();
}

function populateAllInputs() {
  browser.findElement(createBeaconLocators.titleInput).sendKeys('t');
  browser.findElement(createBeaconLocators.descriptionInput).sendKeys('d');
  browser.findElement(createBeaconLocators.streetAddressInput).sendKeys('s');
  browser.findElement(createBeaconLocators.zipInput).sendKeys('z');
  browser.findElement(createBeaconLocators.numberOfPeopleInput).sendKeys('n');
}

function expectAlertWithOneEmptyInput(emptyPropertyName, emptyElement) {
  describe('when filling in all but ' + emptyPropertyName, function() {
    beforeEach(function() {
      populateAllInputs();

      // Then clear one of them
      browser.findElement(emptyElement).clear();
    });
    describe('clicking Submit Beacon', function() {
      beforeEach(function() {
        clickSubmitBeaconButton();
      });
      describe('clicking the resulting error alert', function() {
        beforeEach(function() {
          acceptAlertDialog();
        });
        it('should bring the user back to the beacon list', function() {
          expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
        });
      });
    });
  });
}

describe('the create beacon view', function() {
  beforeEach(function() {
    browser.get('/#/dashboard/beacons/create')
  });
  expectAlertWithOneEmptyInput('title', createBeaconLocators.titleInput);
  expectAlertWithOneEmptyInput('description', createBeaconLocators.descriptionInput);
  expectAlertWithOneEmptyInput('street address', createBeaconLocators.streetAddressInput);
  expectAlertWithOneEmptyInput('zip', createBeaconLocators.zipInput);
  expectAlertWithOneEmptyInput('number of people', createBeaconLocators.numberOfPeopleInput);
  it('should allow for the creation of a new beacon', function() {
    // Arrange - count existing beacons and select the button to create a new one
    browser.get('/#/dashboard/beacons');
    browser.findElement(listBeaconsLocators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/create');

    // Act - create a new beacon
    browser.findElement(createBeaconLocators.titleInput).sendKeys('Fix The BitGrid');
    browser.findElement(createBeaconLocators.descriptionInput).sendKeys('At My House');
    browser.findElement(createBeaconLocators.streetAddressInput).sendKeys('2729 Merrilee Drive');
    browser.findElement(createBeaconLocators.zipInput).sendKeys('22031');
    browser.findElement(createBeaconLocators.numberOfPeopleInput).sendKeys('1')
      .then(function() {
        browser.findElement(createBeaconLocators.submitButton).click();
      });

    // Assert - ensure we're back at the list of beacons and the new one is there
    expect(browser.getCurrentUrl()).not.toContain('/create');
  });
});
