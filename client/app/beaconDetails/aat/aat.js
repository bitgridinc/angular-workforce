"use strict";

var locators = new (require('./locators.js'))()
  , beaconControlLocators = new (require('../../beaconControl/aat/locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))();

describe('the view that displays the details of', function() {
  describe('the Murfreesboro Electric Department beacon', function() {
    beforeEach(function() {
      browser.get('/#/dashboard/beacons/30');
    });

    it('should display detailed information about the beacon', function() {
      var summaryHeaderElement = element(locators.summaryHeader);
      expect(summaryHeaderElement.getText()).toContain('Murfreesboro Electric Department');
      expect(summaryHeaderElement.getText()).toContain('Title_30');
      expect(summaryHeaderElement.getText()).toContain('Description_30');
      expect(element(locators.streetAddress).getText()).toContain('1563 N Thompson Ln');
    });

    it('should go back to the list of beacons when the summary header (with the back symbol) is clicked', function() {
      expect(browser.isElementPresent(locators.goBack)).toBeFalsy();
      browser.findElement(locators.summaryHeader).click();
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
    });

    it('should close the entire left control when the My Beacons button (in the upper left) is clicked', function() {
      browser.findElement(beaconControlLocators.myBeaconsButton).click();
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard$');
    });

    it('should display a button that allows the user to review offers of assistance', function() {
      browser.findElement(directiveLocators.reviewOffersButton).click();
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/30/review/2cf8faaa-5760-41c9-adbf-5a4482ac3469$');
    });

    it('should display a button that allows the user to offer assistance to Murfreesboro', function() {
      browser.findElement(locators.offerAssistance).click();
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/30/assist$');
    });
  });
});
