"use strict";

describe('the profile page', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/profile');
  });

  describe('the Save button', function() {
    it('should change the url when clicked', function() {
      ptor.findElement(protractor.By.buttonText('Save')).click();
      expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    });
  });
});