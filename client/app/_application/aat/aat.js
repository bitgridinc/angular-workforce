"use strict";

describe('the application', function() {
  // Put this in every AAT suite
  afterEach(function() {
    // Will write out all warnings and errors at the end of each test
    browser.manage().logs().get('browser').then(function(browserLogs) {
      browserLogs.forEach(function(log) {
        console.log(log.message);
      });
    });
  });

  it('should redirect to homepage when / is accessed', function() {
    // Arrange
    browser.get('/#/dashboard');
    var dashboardUrl = browser.getCurrentUrl();

    // Act
    browser.get('/');

    // Assert
    expect(browser.getCurrentUrl()).toBe(dashboardUrl);
  });
});