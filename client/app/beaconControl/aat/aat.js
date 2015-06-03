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
  it('starting with it collapsed, clicking it should expand the control', function() {
    // Arrange
    browser.get('/#/dashboard');

    // Act
    clickMyBeaconsButton();

    // Assert the url changed
    expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');

    // Assert the control is expanded
    expectSelfIconIsDisplayed().toBeTruthy();
    expectRightArrowfIconIsDisplayed().toBeTruthy();
    expectLeftControlDivIsDisplayedToBeTruthy();
  });
  it('starting with it expanded, clicking it should collapse the control', function() {
    // Arrange
    browser.get('/#/dashboard/beacons');

    // Act
    clickMyBeaconsButton();

    // Assert the url changed
    expect(browser.getCurrentUrl()).toMatch('/#/dashboard$');

    // Assert the control is collapsed
    expectSelfIconIsDisplayed().toBeTruthy();
    expectRightArrowfIconIsDisplayed().toBeFalsy();
    expectLeftControlDivNotPresentToBeFalsy();
  });
});