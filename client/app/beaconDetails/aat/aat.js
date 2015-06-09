"use strict";

var locators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))();

/// The goal of this test suite is to test both the existence and, when applicable, the non-existence of each of the
/// following:
/// 1. title, description, utility, address, people
/// 2. button to offer assistance + navigation
/// 3. button to review offers of assistance + navigation
/// 4. accepted offer from another utility with person, # of people, and date
describe('the beacon details view', function() {
  // Put this in every AAT suite
  afterEach(function() {
    // Will write out all warnings and errors at the end of each test
    browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        console.log(log.message);
      });
    });
  });

  describe('on beacon 32', function() {
    beforeEach(function() {
      browser.get('/#/dashboard/beacons/32');
    });

    it('should display information about the beacon', function() {
      // Assert
      var summaryHeaderText = element(locators.summaryHeader).getText();
      expect(summaryHeaderText).toContain('Morristown Utility Systems');
      expect(summaryHeaderText).toContain('Title_32');
      expect(summaryHeaderText).toContain('Description_32');
      expect(element(locators.streetAddress).getText()).toContain('1567 N Thompson Ln');
      expect(element(locators.numberOfPeople).getText()).toContain('4-5');
    });
    it('should go back to the list of beacons when the summary header (with the back symbol) is clicked', function() {
      // Act
      browser.findElement(locators.summaryHeader).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
    });
    it('clicking the button to review offers of assistance should navigate properly', function() {
      // Act
      browser.findElement(directiveLocators.reviewOffersButton).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/32/review/eb6cd1ad-d115-49de-aac0-cfbb887d9ad0$');
    });
    it('should not display a button to offer assistance because the beacon was created by the user', function() {
      // Assert
      expect(browser.isElementPresent(locators.offerAssistance)).toBeFalsy();
    });
    it('should not display any accepted offer information because none were accepted', function() {
      expect(element.all(locators.acceptedAssistanceRepeater).count()).toBe(0);
    });
  });

  describe('on beacon 34', function() {
    beforeEach(function() {
      browser.get('/#/dashboard/beacons/34');
    });

    it('clicking the button to offer assistance should navigate properly', function() {
      // Act
      browser.findElement(locators.offerAssistance).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/34/assist$');
    });
    it('should not display a button to review offers of assistance because there are none', function() {
      // Assert
      expect(browser.isElementPresent(directiveLocators.reviewOffersButton)).toBeFalsy();
    });
    it('should display the accepted offer information', function() {
      var acceptedAssistanceText = element(locators.acceptedAssistanceRepeater.row(0)).getText();
      expect(acceptedAssistanceText).toMatch('3 on their way\n');
      expect(acceptedAssistanceText).toMatch('Morristown Utility Systems\n');
      expect(acceptedAssistanceText).toMatch('1:01 AM$');
    });
  });
});
