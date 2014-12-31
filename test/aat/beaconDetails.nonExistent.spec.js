"use strict";

var BeaconDetailsLocators = require('./beaconDetails.locators.js');

describe('viewing beacon details on an invalid beacon', function() {
  var ptor,
      beaconDetailsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/detail/99999non-exis-tent-9999-999999999999');
  });

  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  it('should display an error page', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/99999non-exis-tent-9999-999999999999');
    expect(ptor.isElementPresent(beaconDetailsLocators.goBack)).toBeTruthy();
    expect(element(beaconDetailsLocators.selectBeacon).isDisplayed()).toBeFalsy();
    expect(element(beaconDetailsLocators.offerAssistance).isDisplayed()).toBeFalsy();
  });

  describe('the go back button', function() {
    it('should change the url when clicked', function() {
      ptor.findElement(beaconDetailsLocators.goBack).click();
      expect(browser.getCurrentUrl()).not.toContain('/detail/99999non-exis-tent-9999-999999999999');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    });
  });
});
