"use strict";

var aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.recordErrorsWrapper(function() {
  describe('the application', function() {
    it('should redirect to the login page when / is accessed', function() {
      // Arrange
      browser.get('/#/login/dashboard');
      var loginUrl = browser.getCurrentUrl();

      // Act
      browser.get('/');

      // Assert
      expect(browser.getCurrentUrl()).toBe(loginUrl);
    });
  })
});