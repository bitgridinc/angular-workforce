"use strict";

var locators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

/// The goal of this test suite is to test both the existence and, when applicable, the non-existence of each of the
/// following:
/// 1. title, description, utility, address, people
/// 2. button to offer assistance + navigation
/// 3. button to review offers of assistance + navigation
/// 4. accepted offer from another utility with person, # of people, and date
aatWrappers.browserGetWrapper('the beacon details view', function(testRunner, suiteRunner) {
  suiteRunner('/#/dashboard/beacons/32', 'on beacon 32', function() {
    it('should display information about the beacon', function() {
      // Assert
      var summaryHeaderText = element(locators.summaryHeader).getText();
      expect(summaryHeaderText).toContain('Morristown Utility Systems');
      expect(summaryHeaderText).toContain('Title_32');
      expect(summaryHeaderText).toContain('Description_32');
      expect(browser.isElementPresent(locators.streetAddress)).toBeFalsy();
      expect(browser.isElementPresent(locators.zip)).toBeFalsy();
      expect(element(locators.usng).getText()).toContain('16SED7282495516');
      expect(element(locators.startDate).getText()).toMatch('Start billing at 11/1/15 3:04 AM$');
      expect(element(locators.numberOfPeople).getText()).toMatch('Morristown Utility Systems requests 4-5 people');
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

  suiteRunner('/#/dashboard/beacons/34', 'on beacon 34', function() {
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
      expect(element(locators.streetAddress).getText()).toMatch('1571 N Thompson Ln\n37129$$'); // TODO: Why does the streetAddress locator pick up the zip?
      expect(element(locators.usng).getText()).toMatch('16SEE5448417568$');
      expect(element(locators.startDate).getText()).toMatch('Start billing immediately$');
      expect(element(locators.numberOfPeople).getText()).toContain('Murfreesboro Electric Department requests as much help as possible');
    });
  });
});
