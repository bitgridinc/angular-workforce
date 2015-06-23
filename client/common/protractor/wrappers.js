"use strict";

module.exports = {
  // This belongs around every AAT suite
  recordErrorsWrapper: function(inner) {
    describe('(rew)', function() {
      afterEach(function() {
        // Will write out all warnings and errors at the end of each test
        browser.manage().logs().get('browser').then(function(browserLogs) {
          browserLogs.forEach(function(log) {
            console.log(log.message);
          });
        });
      });

      inner();
    });
  },
  // There can only be one browser.get per test, and the login must come after the redirect. This function removes the
  // boilerplate nature of logging in for every AAT around the authentication-required functionality.
  authenticationRequiredWrapper: function(suiteName, tests) {
    this.recordErrorsWrapper(function() {
      describe('(arw-' + suiteName + ')', function() {
        tests(function(url, testName, testInner) {
          it(testName, function() {
            // Arrange
            browser.get(url);

            testInner();
          });
        }, function(url, suiteName, suiteInner) {
          describe(suiteName, function() {
            beforeEach(function() {
              // Arrange
              browser.get(url);
            });

            suiteInner();
          });
        });
      });
    });
  }
};
