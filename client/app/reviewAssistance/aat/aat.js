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

  it('should display the name of the organization that offered assistance', function() {
    var organizationLabelElement = element(reviewAssistanceLocators.organizationLabel);
    expect(organizationLabelElement.getText()).toContain('Their Organization');
    expect(organizationLabelElement.getText()).toContain('with 4 people');
    expect(organizationLabelElement.getText()).toContain('2015');
  });

  // TODO: Deal with the duplication between this and offerAssistance. Tricky given how this functionality will change
  // TODO: when it is possible to accept multiple beacons.
  it('should navigate to the list of beacons when an offer is accepted', function() {
    ptor.findElement(reviewAssistanceLocators.acceptButton).click();
    expect(browser.getCurrentUrl()).not.toContain('/review');
    expect(browser.getCurrentUrl()).not.toContain('/detail');
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
  });
});
