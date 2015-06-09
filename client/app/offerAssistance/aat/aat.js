"use strict";

var locators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))();

describe('the offer assistance view', function() {
  // Put this in every AAT suite
  afterEach(function() {
    // Will write out all warnings and errors at the end of each test
    browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        console.log(log.message);
      });
    });
  });

  describe('when offering assistance to beacon 34', function() {
    beforeEach(function() {
      // Arrange
      browser.get('/#/dashboard/beacons/34/assist');
    });

    it('should display the details of the beacon being assisted', function() {
      // Assert that the binding was populated properly
      expect(element(locators.headerParagraph).getText()).toMatch('^Murfreesboro Electric Department has');
    });
    it('should allow for selecting a date through the calendar', function() {
      // Act by opening the calendar and selecting the date as today
      browser.findElement(locators.toggleCalendarButton).click();
      browser.findElement(locators.calendarTodayButton).click();

      // Assert
      expect(element(locators.calendarTodayButton).isDisplayed()).toBeFalsy();
      expect(element(locators.dateInput).getAttribute('value')).toMatch(/\d\d?\/\d\d?\/\d\d$/);
    });
    // This is always the case for our AATs, but it's helpful to ensure that an empty container is hidden as right now
    // our AGO accessToken is hardcoded so our users don't show up on the jitsu.
    it('should not display the users container when there are no users to display', function() {
      // Assert
      expect(browser.isElementPresent(locators.usersContainer)).toBeFalsy();
    });
    it('submitting an offer to beacon 34 should navigate the user back to the beacon list where a third review offers button appears', function() {
      // Act
      browser.findElement(locators.assistButton).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
      expect(element.all(directiveLocators.reviewOffersButton).count()).toBe(3);
    });
  });
});
