"use strict";

describe('the app module', function() {
  it('should redirect to homepage when / is accessed', function() {
    browser.get('/dashboard');
    var dashboardUrl = browser.getCurrentUrl();

    browser.get('/');
    expect(browser.getCurrentUrl()).toBe(dashboardUrl);
  });
});