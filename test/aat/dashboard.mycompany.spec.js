"use strict";

describe('having the My Company button toggled on', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany');
  });

  it('should display the user\'s beacon summary list', function() {
    expect(element(by.buttonText('Create Beacon')).isDisplayed()).toBeTruthy();
  });
  it('should not be displaying create beacon view', function() {
    expect(ptor.isElementPresent(by.buttonText('Submit Beacon'))).toBeFalsy();
  });

  describe('clicking the Create Beacon button', function() {
    var button;

    beforeEach(function() {
      button = ptor.findElement(protractor.By.buttonText('Create Beacon'));
      button.click();
    });

    it('should change the url', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/create');
    });
    it('should obscure itself', function() {
      // Note that we don't have logic for clicking the Create Beacon button twice
      expect(button.isDisplayed()).toBeFalsy();
    });
  });
});
