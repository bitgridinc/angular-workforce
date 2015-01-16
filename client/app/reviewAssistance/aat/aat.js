// go to url and ensure text appears
"use strict";

var ReviewAssistanceLocators = require('./locators.js');

describe('the offer assistance view', function() {
  var ptor,
      reviewAssistanceLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/review');
    reviewAssistanceLocators = new ReviewAssistanceLocators();
  });

  it('should navigate to the list of beacons when an offer is accepted', function() {
    ptor.findElement(reviewAssistanceLocators.acceptButton).click();
    expect(browser.getCurrentUrl()).not.toContain('/review');
    expect(browser.getCurrentUrl()).not.toContain('/detail');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
  });
});
