"use strict";

var locators = new (require('./locators.js'))()
  , dashboardLocators = new (require('../../dashboard/aat/locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers')
  , EC = protractor.ExpectedConditions;

function clickSubmitBeaconButton() {
  browser.findElement(locators.submitButton).click();
}

function populateAllInputs() {
  browser.findElement(locators.titleInput).sendKeys('t');
  browser.findElement(locators.descriptionInput).sendKeys('d');
  //browser.findElement(locators.streetAddressInput).sendKeys('s');
  //browser.findElement(locators.zipInput).sendKeys('z');
  //browser.findElement(locators.startDateInput).sendKeys('2099-09-16');
  //browser.findElement(locators.numberOfPeopleInput).sendKeys('n');
}

function assertInputIsRequired(emptyPropertyName, emptyElement) {
  it('should disable the Submit Beacon button when filling in all properties except ' + emptyPropertyName, function() {
    // Arrange
    populateAllInputs();

    // Act
    browser.findElement(emptyElement).clear();

    // Assert
    expect(element(locators.submitButton).isEnabled()).toBe(false);
  });
}

aatWrappers.browserGetWrapper('the create beacon view', function(testRunner, suiteRunner) {
  // TODO: This describe is useless
  suiteRunner('/#/dashboard/beacons/create', '', function() {
    // These makes sure that an alert is raised if any required properties are missing.
    assertInputIsRequired('title', locators.titleInput);
    assertInputIsRequired('description', locators.descriptionInput);
    //assertInputIsRequired('street address', locators.streetAddressInput);
    //assertInputIsRequired('zip', locators.zipInput);
    //assertInputIsRequired('start date', locators.startDateInput);
    //assertInputIsRequired('number of people', locators.numberOfPeopleInput);

    it('should disable the submit button when no recipients are selected', function() {
      // Arrange
      populateAllInputs();

      // Act
      element.all(locators.recipientIncludeCheckbox).then(function(elements) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].click();
        }
      });

      // Assert
      expect(element(locators.submitButton).isEnabled()).toBe(false);
    });

    it('should pop a success toastr when a beacon is successfully created', function() {
      // Arrange
      var toastrTitleElement = element(dashboardLocators.toastrTitle);

      // Act
      browser.findElement(locators.titleInput).sendKeys('Fix The BitGrid');
      browser.findElement(locators.descriptionInput).sendKeys('At My House')
      //browser.findElement(locators.streetAddressInput).sendKeys('2729 Merrilee Drive');
      //browser.findElement(locators.zipInput).sendKeys('22031');
      //browser.findElement(locators.startDateInput).sendKeys('2099-09-16');
      //browser.findElement(locators.numberOfPeopleInput).sendKeys('1')
        .then(function() {
          clickSubmitBeaconButton();
        });

      // Assert
      browser.wait(EC.textToBePresentInElement(toastrTitleElement, 'Success!'), 5000);
    });

    // TODO: AAT for the Cancel button (should it remove the unit test?)
  });
});
