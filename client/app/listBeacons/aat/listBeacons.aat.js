"use strict";

var Locators = require('./listBeacons.locators.js');

describe('having the My Beacons button clicked to view the list of existing beacons', function() {
  var ptor,
      locators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons');
  });
  beforeEach(function() {
    locators = new Locators();
  });

  it('should display a button to create a new beacon', function() {
    ptor.findElement(locators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/create');
    // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
    expect(ptor.isElementPresent(locators.createBeaconButton)).toBeFalsy();
  });

  it('should allow the user to review offers of assistance without having to view the beacon details first', function() {
    ptor.findElement(locators.reviewOffersButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/review');
  });

  describe('clicking an existing beacon', function() {
    beforeEach(function() {
      ptor.findElement(locators.beaconSummaryDirective).click();
    });

    it('should expand the beacon to view its details', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/');
      expect(ptor.isElementPresent(locators.createBeaconButton)).toBeFalsy();
    });
  });
});
