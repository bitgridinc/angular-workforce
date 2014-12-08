"use strict";

var BeaconDetailsLocators = require('./beaconDetails.locators.js');

describe('the beacon details view', function() {
  var ptor,
      beaconDetailsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/detail/0');
  });

  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  describe('the select beacon button', function() {
    it('should change the url when clicked', function() {
      ptor.findElement(beaconDetailsLocators.selectBeacon).click();
      expect(browser.getCurrentUrl()).not.toContain('/detail/0');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    });
  });
});
