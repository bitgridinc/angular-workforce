"use strict";

var offerAssistanceLocators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))();

describe('the offer assistance view', function() {
  describe('when offering assistance to beacon 34', function() {
    beforeEach(function() {
      // Arrange
      browser.get('/#/dashboard/beacons/34/assist');
    });

    it('should display the details of the beacon being assisted', function() {
      // Assert that the binding was populated properly
      expect(element(offerAssistanceLocators.headerParagraph).getText()).toMatch(/^Murfreesboro Electric Department has/);
    });
    it('should allow for selecting a date through the calendar', function() {
      // Act by opening the calendar and selecting the date as today
      browser.findElement(offerAssistanceLocators.toggleCalendarButton).click();
      browser.findElement(offerAssistanceLocators.calendarTodayButton).click();

      // Assert
      expect(element(offerAssistanceLocators.calendarTodayButton).isDisplayed()).toBeFalsy();
      expect(element(offerAssistanceLocators.dateInput).getAttribute('value')).toMatch(/\d\d?\/\d\d?\/\d\d$/);
    });
    it('submitting an offer to beacon 34 should navigate the user back to the beacon list where a third review offers button appears', function() {
      // Act
      browser.findElement(offerAssistanceLocators.assistButton).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
      expect(element.all(directiveLocators.reviewOffersButton).count()).toBe(3);
    });
  });
});
