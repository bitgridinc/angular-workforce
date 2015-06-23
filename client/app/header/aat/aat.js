"use strict";

var locators = new (require('./locators.js'))()
  , aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.browserGetWrapper('the header', function(testRunner, suiteRunner) {
  suiteRunner('/#/dashboard', 'when reviewing offers for beacon 30, which was sent by another utility,', function() {
    it('should display the utility name', function() {
      expect(element(locators.leftText).getText()).toMatch('Morristown Utility Systems$');
    });
  });
});
