"use strict";

var BeaconDetailsLocators = require('./beaconDetails.locators.js');

describe('the beacon details view', function() {
  var ptor,
      beaconDetailsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
  });

  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  it('should navigate to the populated details page', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
    expect(ptor.isElementPresent(beaconDetailsLocators.selectBeacon)).toBeTruthy();
    expect(ptor.isElementPresent(beaconDetailsLocators.offerAssistance)).toBeTruthy();
    expect(element(beaconDetailsLocators.goBack).isDisplayed()).toBeFalsy();
  });

  describe('the select beacon summary card', function() {
    it('should navigate back to the list when clicked', function() {
      ptor.findElement(beaconDetailsLocators.selectBeacon).click();
      expect(browser.getCurrentUrl()).not.toContain('/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    });
  });

  describe('the offer assistance button', function() {
    it('should navigate to the offer assistance view', function() {
      ptor.findElement(beaconDetailsLocators.offerAssistance).click();
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/e688af0b-63df-48bc-941c-9cc5f750367b/assist');
    });
  });
});
