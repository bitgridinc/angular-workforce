"use strict";

var locators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.browserGetWrapper('the offer assistance view', function(testRunner, suiteRunner) {
  suiteRunner('/#/dashboard/beacons/34/assist',
              'when offering assistance to beacon 34', function() {
    it('should display the details of the beacon being assisted', function() {
      // Assert that the binding was populated properly
      expect(element(locators.headerParagraph).getText()).toMatch('^Murfreesboro Electric Department has');
    });
    it('should display the users container', function() {
      // Assert
      expect(browser.isElementPresent(locators.usersContainer)).toBeTruthy();
    });
    it('should not allow clicking the Assist button before a date is selected', function() {
      // Assert
      expect(element(locators.assistButton).isEnabled()).toBe(false);
    });
    it('submitting an offer to beacon 34 should navigate the user back to the beacon list where a third review offers button appears', function() {
      // Arrange
      browser.findElement(locators.arrivalDateInput).sendKeys('2099-09-16')
        .then(function() {
          // Click elsewhere to autoclose the calendar
          browser.findElement(locators.headerParagraph).click();
        });

      // Act
      browser.findElement(locators.assistButton).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
      expect(element.all(directiveLocators.reviewOffersButton).count()).toBe(3);
    });
  });
});
