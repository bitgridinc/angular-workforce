"use strict";

var locators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))();

describe('having the My Beacons button clicked to view the list of existing beacons', function() {
  beforeEach(function() {
    browser.get('/#/dashboard/beacons');
  });

  it('should display a button to create a new beacon', function() {
    browser.findElement(locators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/create');
    // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
    expect(browser.isElementPresent(locators.createBeaconButton)).toBeFalsy();
  });

  it('should allow the user to review offers of assistance without having to view the beacon details first', function() {
    element.all(directiveLocators.reviewOffersButton).get(0).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/30/review');
  });

  it('should only show 4/5 beacons (1 filtered out)', function() {
    expect(element.all(locators.beaconSummaryDirective).count()).toBe(4);
  });

  describe('clicking an existing beacon', function() {
    beforeEach(function() {
      element.all(locators.beaconSummaryDirective).get(0).click();
    });

    it('should expand the beacon to view its details', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/');
      expect(browser.isElementPresent(locators.createBeaconButton)).toBeFalsy();
    });
  });
});
