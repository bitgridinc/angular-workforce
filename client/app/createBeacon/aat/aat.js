"use strict";

var createBeaconLocators = new (require('./locators.js'))()
  , listBeaconsLocators = new (require('../../listBeacons/aat/locators.js'))();

function clickSubmitBeaconButton() {
  browser.findElement(createBeaconLocators.submitButton).click();
}
function getAlertDialog(callback) {
  browser.wait(function() {
    return browser.switchTo().alert().then(
      function(alert) {
        callback(alert);
        return true;
      },
      function() { return false; }
    );
  }, 25000);
}

function populateAllInputs() {
  browser.findElement(createBeaconLocators.titleInput).sendKeys('t');
  browser.findElement(createBeaconLocators.descriptionInput).sendKeys('d');
  browser.findElement(createBeaconLocators.streetAddressInput).sendKeys('s');
  browser.findElement(createBeaconLocators.zipInput).sendKeys('z');
  browser.findElement(createBeaconLocators.numberOfPeopleInput).sendKeys('n');
}

function expectAlertWithOneEmptyInput(emptyPropertyName, emptyElement) {
  it('should raise an alert when filling in all properties except ' + emptyPropertyName, function() {
    // Arrange
    populateAllInputs();
    browser.findElement(emptyElement).clear();

    // Act
    clickSubmitBeaconButton();

    // Act/Assert because acting asserts the alert is there
    getAlertDialog(function(alert) {
      alert.accept();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
    });
  });
}

describe('the create beacon view', function() {
  beforeEach(function() {
    browser.get('/#/dashboard/beacons/create')
  });

  // These makes sure that an alert is raised if any required properties are missing.
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
    browser.findElement(createBeaconLocators.streetAddressInput).sendKeys('2729 Merrilee Drive APT 213');
    browser.findElement(createBeaconLocators.zipInput).sendKeys('22031');
    browser.findElement(createBeaconLocators.numberOfPeopleInput).sendKeys('1')
      .then(function() {
        browser.findElement(createBeaconLocators.submitButton).click();
      });

    // Assert - ensure we're back at the list of beacons and the new one is there
    expect(browser.getCurrentUrl()).toMatch(/\/dashboard\/beacons$/);
    getAlertDialog(function(alert) {
      alert.accept();
    });
  });
});
