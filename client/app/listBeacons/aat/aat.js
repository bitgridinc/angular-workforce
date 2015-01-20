"use strict";

var ListBeaconsLocators = require('./locators.js');
var BeaconSummaryLocators = require('../../../common/directives/aat/beaconSummary.locators.js');

describe('having the My Beacons button clicked to view the list of existing beacons', function() {
  var ptor,
      listBeaconsLocators,
      beaconSummaryLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons');
  });
  beforeEach(function() {
    listBeaconsLocators = new ListBeaconsLocators();
    beaconSummaryLocators = new BeaconSummaryLocators();
  });

  it('should display a button to create a new beacon', function() {
    ptor.findElement(listBeaconsLocators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/create');
    // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
    expect(ptor.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
  });

  it('should allow the user to review offers of assistance without having to view the beacon details first', function() {
    ptor.findElement(beaconSummaryLocators.reviewOffersButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/review');
  });

  describe('clicking an existing beacon', function() {
    beforeEach(function() {
      ptor.findElement(listBeaconsLocators.beaconSummaryDirective).click();
    });

    it('should expand the beacon to view its details', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/');
      expect(ptor.isElementPresent(locators.createBeaconButton)).toBeFalsy();
    });
  });
});
