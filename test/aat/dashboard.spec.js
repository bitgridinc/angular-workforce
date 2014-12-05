"use strict";

describe('the dashboard page', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard');
  });

  /*it('should have a button that says My\\nCompany', function() {
    var myCompanyBtn = ptor.findElement(protractor.By.className('db-btn'));
    expect(myCompanyBtn.getText()).toBe('My\nCompany');
  });
  it('should have a button that says My\\nCompany', function() {
    expect(ptor.isElementPresent(by.buttonText('My\nCompany'))).toBeTruthy();
  });
  it('should have a button that says My\\nCompany', function() {
    expect(element(by.buttonText('My\nCompany')).isDisplayed()).toBeTruthy();
  });*/

  // This is hackish since I couldn't get the line By.tagName('leaflet') to work...
  it('should have a leaflet element', function() {
    ptor.findElement(protractor.By.id('leaflet'));
  });
  it('should not be displaying the user\'s beacon summary list', function() {
    expect(element(by.buttonText('Create Beacon')).isDisplayed()).toBeFalsy();
  });

  describe('the My Company button', function() {
    it('should change the url when clicked', function() {
      ptor.findElement(protractor.By.buttonText('My\nCompany')).click();
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    });
  })
});