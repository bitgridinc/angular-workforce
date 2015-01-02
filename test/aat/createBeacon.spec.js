"use strict";

var CreateBeaconLocators = require('./createBeacon.locators.js');

describe('the page used to create a new beacon', function() {
  var ptor,
      createBeaconLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/create');
  });

  beforeEach(function() {
    createBeaconLocators = new CreateBeaconLocators();
  });

  it('should have a Submit Beacon button that navigates to the list of beacons when clicked', function() {
    ptor.findElement(createBeaconLocators.submitButton).click();
    expect(browser.getCurrentUrl()).not.toContain('/create');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
  });
});
