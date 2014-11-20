"use strict";

describe('home page', function() {
  it('should set home page title to BitGrid', function() {
    browser.get('/dashboard');
    expect(browser.getTitle()).toBe("BitGrid");
  });
});
