"use strict";

describe('the /#/dashboard/mycompany route', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany');
  });

  it('should display the user\'s beacon summary list', function() {
    expect(element(by.buttonText('Create Beacon')).isDisplayed()).toBeTruthy();
  });
  it('should not be displaying create beacon view', function() {
    expect(ptor.isElementPresent(by.buttonText('Submit Beacon'))).toBeFalsy();
  });
});
