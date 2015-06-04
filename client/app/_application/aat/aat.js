"use strict";

describe('the application', function() {
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