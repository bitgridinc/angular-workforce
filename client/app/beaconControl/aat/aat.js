"use strict";

var locators = new (require('./locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

function clickMyBeaconsButton() {
  browser.findElement(locators.myBeaconsButton).click();
}
function expectLeftControlDivIsDisplayedToBeTruthy() {
  expect(element(locators.leftControlDiv).isDisplayed()).toBeTruthy();
}
function expectLeftControlDivNotPresentToBeFalsy() {
  expect(browser.isElementPresent(locators.leftControlDiv)).toBeFalsy();
}
function expectSelfIconIsDisplayed() {
  return expect(element(locators.selfIcon).isDisplayed());
}
function expectRightArrowfIconIsDisplayed() {
  return expect(element(locators.rightArrowIcon).isDisplayed());
}
function assertControlIsCollapsed() {
  // Assert the url changed
  expect(browser.getCurrentUrl()).toMatch('/#/dashboard$');

  // Assert the control is collapsed
  expectSelfIconIsDisplayed().toBeTruthy();
  expectRightArrowfIconIsDisplayed().toBeFalsy();
  expectLeftControlDivNotPresentToBeFalsy();
}

aatWrappers.authenticationRequiredWrapper('beaconControl', function(testRunner) {
  testRunner('/#/dashboard', 'starting with it collapsed, clicking it should expand the control', function() {
    // Act
    clickMyBeaconsButton();

    // Assert the url changed
    expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');

    // Assert the control is expanded
    expectSelfIconIsDisplayed().toBeTruthy();
    expectRightArrowfIconIsDisplayed().toBeTruthy();
    expectLeftControlDivIsDisplayedToBeTruthy();
  });
  testRunner('/#/dashboard/beacons', 'starting with it expanded, clicking it should collapse the control', function() {
    // Act
    clickMyBeaconsButton();

    // Assert
    assertControlIsCollapsed();
  });
  testRunner('/#/dashboard/beacons/30', 'starting at a nested state, clicking it should still collapse the control', function() {
    // Act
    clickMyBeaconsButton();

    // Assert
    assertControlIsCollapsed();
  });
});
