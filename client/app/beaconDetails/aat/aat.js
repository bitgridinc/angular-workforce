"use strict";

var BeaconControlLocators = require('../../beaconControl/aat/locators.js');
var BeaconDetailsLocators = require('./locators.js');
var BeaconSummaryLocators = require('../../../common/directives/aat/beaconSummary.locators.js');
var MapLocators = require('../../map/aat/locators.js');

describe('the view that displays the details of', function() {
  var ptor,
      beaconControlLocators,
      beaconDetailsLocators,
      beaconSummaryLocators,
      mapLocators;


  beforeEach(function() {
    beaconControlLocators = new BeaconControlLocators();
    beaconDetailsLocators = new BeaconDetailsLocators();
    beaconSummaryLocators = new BeaconSummaryLocators();
    mapLocators = new MapLocators();
  });

  describe('the Murfreesboro Electric Department beacon', function() {
    beforeEach(function() {
      ptor = protractor.getInstance();
      ptor.get('/#/dashboard/beacons/30');
      browser.driver.sleep(1000);
    });

    it('should display detailed information about the beacon', function() {
      var summaryHeaderElement = element(beaconDetailsLocators.summaryHeader);
      expect(summaryHeaderElement.getText()).toContain('Murfreesboro Electric Department');
      expect(summaryHeaderElement.getText()).toContain('Murfreesboro Title');
      expect(summaryHeaderElement.getText()).toContain('Murfreesboro Description');
      expect(element(beaconDetailsLocators.streetAddress).getText()).toContain('1563 N Thompson Ln');
    });

    it('should go back to the list of beacons when the summary header (with the back symbol) is clicked', function() {
      expect(ptor.isElementPresent(beaconDetailsLocators.goBack)).toBeFalsy();
      ptor.findElement(beaconDetailsLocators.summaryHeader).click();
      expect(browser.getCurrentUrl()).not.toContain('/30');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
    });

    it('should close the entire left control when the My Beacons button (in the upper left) is clicked', function() {
      ptor.findElement(beaconControlLocators.myBeaconsButton).click();
      expect(browser.getCurrentUrl()).not.toContain('/beacons');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    });

    it('should display a button that allows the user to review offers of assistance', function() {
      ptor.findElement(beaconSummaryLocators.reviewOffersButton).click();
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/30/review');
    });

    it('should display a button that allows the user to offer assistance to Murfreesboro', function() {
      ptor.findElement(beaconDetailsLocators.offerAssistance).click();
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/30/assist');
    });
  });
});
