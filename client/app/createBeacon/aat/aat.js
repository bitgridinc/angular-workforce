"use strict";

var locators = new (require('./locators.js'))()
  , listBeaconsLocators = new (require('../../listBeacons/aat/locators.js'))();

function clickSubmitBeaconButton() {
  browser.findElement(locators.submitButton).click();
}
function getAlertDialog(callback) {
  // TODO: Replace with http://angular.github.io/protractor/#/api?view=ExpectedConditions
  // TODO: Also look at client/app/map/aat/aat.js
  browser.wait(function() {
    return browser.switchTo().alert().then(
      function(alert) {
        callback(alert);
        return true;
      },
      function() { return false; }
    );
  }, 5000);
}
function acceptAlertDialog(expectedUrl) {
  getAlertDialog(function(alert) {
    alert.accept();
    expect(browser.getCurrentUrl()).toMatch(expectedUrl);
  });
}

function populateAllInputs() {
  browser.findElement(locators.titleInput).sendKeys('t');
  browser.findElement(locators.descriptionInput).sendKeys('d');
  browser.findElement(locators.streetAddressInput).sendKeys('s');
  browser.findElement(locators.zipInput).sendKeys('z');
  browser.findElement(locators.numberOfPeopleInput).sendKeys('n');
}

function expectAlertWithOneEmptyInput(emptyPropertyName, emptyElement) {
  it('should raise an alert when filling in all properties except ' + emptyPropertyName, function() {
    // Arrange
    populateAllInputs();
    browser.findElement(emptyElement).clear();

    // Act
    clickSubmitBeaconButton();

    // Act/Assert because acting asserts the alert is there
    acceptAlertDialog('/#/dashboard/beacons$');
  });
}

describe('the create beacon view', function() {
  // Put this in every AAT suite
  afterEach(function() {
    // Will write out all warnings and errors at the end of each test
    browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        console.log(log.message);
      });
    });
  });

  beforeEach(function() {
    browser.get('/#/dashboard/beacons/create')
  });

  // These makes sure that an alert is raised if any required properties are missing.
  expectAlertWithOneEmptyInput('title', locators.titleInput);
  expectAlertWithOneEmptyInput('description', locators.descriptionInput);
  expectAlertWithOneEmptyInput('street address', locators.streetAddressInput);
  expectAlertWithOneEmptyInput('zip', locators.zipInput);
  expectAlertWithOneEmptyInput('number of people', locators.numberOfPeopleInput);

  it('should alert when no recipients are selected', function() {
    // Arrange
    element.all(locators.recipientIncludeCheckbox).then(function(elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].click();
      }
    });

    // Act
    clickSubmitBeaconButton();

    // Assert
    acceptAlertDialog('/#/dashboard/beacons/create$'); // Will fail if there is no alert
  });

  it('should allow for the creation of a new beacon', function() {
    // Act
    browser.findElement(locators.titleInput).sendKeys('Fix The BitGrid');
    browser.findElement(locators.descriptionInput).sendKeys('At My House');
    browser.findElement(locators.streetAddressInput).sendKeys('2729 Merrilee Drive');
    browser.findElement(locators.zipInput).sendKeys('22031');
    browser.findElement(locators.numberOfPeopleInput).sendKeys('1')
      .then(function() {
        browser.findElement(locators.submitButton).click();
      });

    // Assert
    acceptAlertDialog('/#/dashboard/beacons$');
  });
});
