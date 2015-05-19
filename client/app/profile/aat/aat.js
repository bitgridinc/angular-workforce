"use strict";

describe('the profile page', function() {
  beforeEach(function() {
    browser.get('/#/profile');
  });

  it('should have a button for saving changes and navigating back to the dashboard', function() {
    browser.findElement(protractor.By.buttonText('Save')).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
  });
});