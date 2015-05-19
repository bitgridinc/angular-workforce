"use strict";

var ListBeaconsLocators = require('./locators.js')
  , BeaconSummaryLocators = require('../../../common/directives/aat/beaconSummary.locators.js');

describe('having the My Beacons button clicked to view the list of existing beacons', function() {
  var listBeaconsLocators
    , beaconSummaryLocators;

  beforeEach(function() {
    browser.get('/#/dashboard/beacons');
  });
  beforeEach(function() {
    listBeaconsLocators = new ListBeaconsLocators();
    beaconSummaryLocators = new BeaconSummaryLocators();
  });

  it('should display a button to create a new beacon', function() {
    browser.findElement(listBeaconsLocators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/create');
    // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
    expect(browser.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
  });

  it('should allow the user to review offers of assistance without having to view the beacon details first', function() {
    element.all(beaconSummaryLocators.reviewOffersButton).get(0).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/30/review');
  });

  it('should only show 4/5 beacons (1 filtered out)', function() {
    expect(element.all(listBeaconsLocators.beaconSummaryDirective).count()).toBe(4);
  });

  describe('clicking an existing beacon', function() {
    beforeEach(function() {
      element.all(listBeaconsLocators.beaconSummaryDirective).get(0).click();
    });

    it('should expand the beacon to view its details', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/');
      expect(browser.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
    });
  });
});
