"use strict";

describe('the /#/dashboard/mycompany/create route', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/create');
  });

  it('should display the user\'s beacon summary list', function() {
    expect(element(by.buttonText('Submit Beacon')).isDisplayed()).toBeTruthy();
  });

  describe('the Submit Beacon button', function() {
    it('should change the url when clicked', function() {
      var button = ptor.findElement(protractor.By.buttonText('Submit Beacon'));
      button.click();
      expect(browser.getCurrentUrl()).not.toContain('/create');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    });
  });
});
