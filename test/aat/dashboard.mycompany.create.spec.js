"use strict";

var CreateBeaconLocators = require('./createBeacon.locators.js');

describe('the /#/dashboard/mycompany/create route', function() {
  var ptor,
      createBeaconLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/create');
  });

  beforeEach(function() {
    createBeaconLocators = new CreateBeaconLocators();
  });

  describe('the Submit Beacon button', function() {
    it('should change the url when clicked', function() {
      ptor.findElement(createBeaconLocators.submitButton).click();
      expect(browser.getCurrentUrl()).not.toContain('/create');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    });
  });
});
