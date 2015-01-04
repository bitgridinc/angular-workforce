"use strict";

var Locators = require('./listBeacons.locators.js');

describe('having the My Company button clicked to view the list of existing beacons', function() {
  var ptor,
      locators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany');
  });
  beforeEach(function() {
    locators = new Locators();
  });

  it('should display a button to create a new beacon', function() {
    ptor.findElement(locators.createBeaconButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/create');
    // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
    expect(ptor.isElementPresent(locators.createBeaconButton)).toBeFalsy();
  });

  describe('clicking an existing beacon', function() {
    beforeEach(function() {
      ptor.findElement(locators.beaconSummaryDirective).click();
    });

    it('should expand the beacon to view its details', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/');
      expect(ptor.isElementPresent(locators.createBeaconButton)).toBeFalsy();
    });
  });
});
