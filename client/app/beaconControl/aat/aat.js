"use strict";

var beaconControlLocators = new (require('./locators.js'))()
  , listBeaconsLocators = new (require('../../listBeacons/aat/locators.js'))();

function clickControl() {
  browser.findElement(beaconControlLocators.myBeaconsButton).click();
}

describe('the beacon control', function() {
  describe('when not expanded', function() {
    beforeEach(function() {
      browser.get('/#/dashboard');
    });
    it('is visible without an arrow icon (visual)', function() {

    });
    it('does not display the contents of the control (e.g., beacon list)', function() {
    });
    describe('when clicked', function() {
      beforeEach(function() { clickControl(); });
      it('opens the contents of the control', function() {
      });
      it('navigates to the correct url', function() {
        expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
      });
    });
  });
  describe('when expanded', function() {
    beforeEach(function() {
      browser.get('/#/dashboard/beacons');
    });
    it('is visible with an arrow icon (visual)', function() {
    });
    it('displays the contents of the control (e.g., beacon list)', function() {
    });
    describe('when clicked', function() {
      beforeEach(function() { clickControl(); });
      it('closes the contents of the control', function() {
      });
      it('navigates to the correct url', function() {
        expect(browser.getCurrentUrl()).toMatch('/#/dashboard$');
      });
    });
  });

  it('should open and close the list of beacons when the My Beacons button is clicked', function() {
    // Arrange
    browser.get('/#/dashboard');

    // Act/Assert for the first click
    browser.findElement(beaconControlLocators.myBeaconsButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
    expect(browser.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeTruthy();

    // Act/Assert for the second click
    browser.findElement(beaconControlLocators.myBeaconsButton).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    expect(browser.getCurrentUrl()).not.toContain('/#/dashboard/beacons');
    expect(browser.isElementPresent(listBeaconsLocators.createBeaconButton)).toBeFalsy();
  });
});