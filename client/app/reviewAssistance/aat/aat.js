// go to url and ensure text appears
"use strict";

var ReviewAssistanceLocators = require('./locators.js');

describe('the review assistance view', function() {
  var ptor,
      reviewAssistanceLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/beacons/30/review/2cf8faaa-5760-41c9-adbf-5a4482ac3469');
    reviewAssistanceLocators = new ReviewAssistanceLocators();
  });

  it('should display the name of the organization that offered assistance', function() {
    var organizationLabelElement = element(reviewAssistanceLocators.organizationLabel);
    expect(organizationLabelElement.getText()).toContain('Morristown Utility Systems');
    expect(organizationLabelElement.getText()).toContain('with 4 people');
    expect(organizationLabelElement.getText()).toContain('2015');
  });
});
