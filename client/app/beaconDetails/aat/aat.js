"use strict";

var BeaconDetailsLocators = require('./locators.js');

describe('the view that displays the details of a particular beacon', function() {
  var ptor,
      beaconDetailsLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
  });

  beforeEach(function() {
    beaconDetailsLocators = new BeaconDetailsLocators();
  });

  it('should display detailed information about the beacon', function() {
    var summaryHeaderElement = element(beaconDetailsLocators.summaryHeader);
    expect(summaryHeaderElement.getText()).toContain('Your Organization');
    expect(summaryHeaderElement.getText()).toContain('Your Title');
    expect(summaryHeaderElement.getText()).toContain('Your Description');
    expect(element(beaconDetailsLocators.latitude).getText()).toContain('38.9');
    expect(element(beaconDetailsLocators.longitude).getText()).toContain('-77');
  });

  it('should go back to the list of beacons when the summary header (with the back symbol) is clicked', function() {
    expect(element(beaconDetailsLocators.goBack).isDisplayed()).toBeFalsy();
    ptor.findElement(beaconDetailsLocators.summaryHeader).click();
    expect(browser.getCurrentUrl()).not.toContain('/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
  });

  it('should display a button that allows the user to offer assistance to the sender of the beacon', function() {
    ptor.findElement(beaconDetailsLocators.offerAssistance).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/assist');
  });

  it('should display a button that allows the user to review offers of assistance', function() {
    ptor.findElement(beaconDetailsLocators.reviewOffers).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/review');
  });
});