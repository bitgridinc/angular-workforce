"use strict";

var beaconControlLocators = new (require('./locators.js'))();

function clickMyBeaconsButton() {
  browser.findElement(beaconControlLocators.myBeaconsButton).click();
}
function expectLeftControlDivIsDisplayedToBeTruthy() {
  expect(element(beaconControlLocators.leftControlDiv).isDisplayed()).toBeTruthy();
}
function expectLeftControlDivNotPresentToBeFalsy() {
  expect(browser.isElementPresent(beaconControlLocators.leftControlDiv)).toBeFalsy();
}
function expectSelfIconIsDisplayed() {
  return expect(element(beaconControlLocators.selfIcon).isDisplayed());
}
function expectRightArrowfIconIsDisplayed() {
  return expect(element(beaconControlLocators.rightArrowIcon).isDisplayed());
}

describe('the beacon control', function() {
  describe('when not expanded', function() {
    beforeEach(function() {
      browser.get('/#/dashboard');
    });
    it('is visible without an arrow icon (visual)', function() {
      expectSelfIconIsDisplayed().toBeTruthy();
      expectRightArrowfIconIsDisplayed().toBeFalsy();
    });
    it('does not display the contents of the control (e.g., beacon list)', function() {
      expectLeftControlDivNotPresentToBeFalsy();
    });
    describe('when clicked', function() {
      beforeEach(function() { clickMyBeaconsButton(); });
      it('displays the contents of the control', function() {
        expectLeftControlDivIsDisplayedToBeTruthy();
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
      expectSelfIconIsDisplayed().toBeTruthy();
      expectRightArrowfIconIsDisplayed().toBeTruthy();
    });
    it('displays the contents of the control (e.g., beacon list)', function() {
      expectLeftControlDivIsDisplayedToBeTruthy();
    });
    describe('when clicked', function() {
      beforeEach(function() { clickMyBeaconsButton(); });
      it('no longer displays the contents of the control', function() {
        expectLeftControlDivNotPresentToBeFalsy();
      });
      it('navigates to the correct url', function() {
        expect(browser.getCurrentUrl()).toMatch('/#/dashboard$');
      });
    });
  });
});