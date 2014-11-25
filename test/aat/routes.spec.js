"use strict";

describe('the app module', function() {
  it('should redirect to /dashboard when / is accessed', function() {
    browser.get('/dashboard');
    var dashboardUrl = browser.getCurrentUrl();

    browser.get('/');
    expect(browser.getCurrentUrl()).toBe(dashboardUrl);
  });
});