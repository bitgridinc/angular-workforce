"use strict";

describe('the profile page', function() {
  // Put this in every AAT suite
  afterEach(function() {
    // Will write out all warnings and errors at the end of each test
    browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        console.log(log.message);
      });
    });
  });

  beforeEach(function() {
    browser.get('/#/profile');
  });

  it('should have a button for saving changes and navigating back to the dashboard', function() {
    browser.findElement(by.buttonText('Save')).click();
    expect(browser.getCurrentUrl()).toMatch('/#/dashboard$');
  });
});