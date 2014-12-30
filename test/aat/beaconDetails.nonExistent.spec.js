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

  it('should remain on the details url', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/99999non-exis-tent-9999-999999999999');
  });
  it('should display a message to the user that the beacon could not be found', function() {
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/99999non-exis-tent-9999-999999999999');
  });

  describe('the go back button', function() {
    it('should change the url when clicked', function() {
      ptor.findElement(beaconDetailsLocators.goBack).click();
      expect(browser.getCurrentUrl()).not.toContain('/detail/99999non-exis-tent-9999-999999999999');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    });
  });
});
