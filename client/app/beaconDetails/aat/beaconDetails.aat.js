"use strict";

var BeaconDetailsLocators = require('./beaconDetails.locators.js');

describe('the view that displays the details of a particular beacon', function() {
  var ptor,
      beaconDetailsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
  });

  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  it('should go back to the list of beacons when the summary header (with the back symbol) is clicked', function() {
    expect(element(beaconDetailsLocators.goBack).isDisplayed()).toBeFalsy();
    ptor.findElement(beaconDetailsLocators.selectBeacon).click();
    expect(browser.getCurrentUrl()).not.toContain('/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
  });

  it('should display a button that allows the user to offer assistance to the sender of the beacon', function() {
    ptor.findElement(beaconDetailsLocators.offerAssistance).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/e688af0b-63df-48bc-941c-9cc5f750367b/assist');
  });
});