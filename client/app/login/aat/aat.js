"use strict";

var login = require('./login')
  , aatWrappers = require('../../../common/protractor/wrappers');

aatWrappers.recordErrorsWrapper(function() {
  describe('the login page', function() {
    // I don't need to validate the success cases because our other AATs will require that implicitly
    it('should not navigate the user to the dashboard with invalid credentials', function() {
      // Arrange
      browser.get('/#/login');

      // Act
      login('invalid', 'invalid');

      // Assert the url changed
      expect(browser.getCurrentUrl()).toMatch('/#/login');
    });
  })
});