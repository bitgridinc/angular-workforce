"use strict";

describe('the profile page', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/profile');
  });

  it('should have a button for saving changes and navigating back to the dashboard', function() {
    ptor.findElement(protractor.By.buttonText('Save')).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
  });
});