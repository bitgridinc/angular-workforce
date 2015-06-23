"use strict";

var locators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.browserGetWrapper('the beacon list', function(testRunner, suiteRunner) {
  suiteRunner('/#/dashboard/beacons',
              'having the My Beacons button clicked to view the list of existing beacons', function() {
    it('should allow the user to review offers of assistance without having to view the beacon details first', function() {
      // Act
      element.all(directiveLocators.reviewOffersButton).get(1).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/32/review/eb6cd1ad-d115-49de-aac0-cfbb887d9ad0$');
    });
    it('should only show 4/5 beacons (1 filtered out)', function() {
      expect(element.all(locators.beaconSummaryDirective).count()).toBe(4);
    });
    it('should only show 2 review offers buttons', function() {
      expect(element.all(directiveLocators.reviewOffersButton).count()).toBe(2);
    });
    it('clicking the third beacon should expand it to display details', function() {
      // Act
      element.all(locators.beaconSummaryDirective).get(2).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/33$');
      expect(browser.isElementPresent(locators.createBeaconButton)).toBeFalsy();
    });
    it('clicking the Create Beacon button should navigate to the create beacon view', function() {
      // Act
      browser.findElement(locators.createBeaconButton).click();

      // Assert
      expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons/create$');
      // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
      expect(browser.isElementPresent(locators.createBeaconButton)).toBeFalsy();
    });
  });
});
