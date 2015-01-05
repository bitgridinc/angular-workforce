"use strict";

describe('the main dashboard', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard');
  });

  /*it('should have a button that says My\\nCompany', function() {
    var myCompanyBtn = ptor.findElement(protractor.By.className('db-btn'));
    expect(myCompanyBtn.getText()).toBe('My\nBeacons');
  });
  it('should have a button that says My\\nCompany', function() {
    expect(ptor.isElementPresent(by.buttonText('My\nBeacons'))).toBeTruthy();
  });
  it('should have a button that says My\\nCompany', function() {
    expect(element(by.buttonText('My\nBeacons')).isDisplayed()).toBeTruthy();
  });*/

  // This is hackish since I couldn't get the line By.tagName('leaflet') to work...
  it('should display a map', function() {
    ptor.findElement(protractor.By.id('leaflet'));
  });
  it('should not have the list of beacons open by default', function() {
    expect(ptor.isElementPresent(by.buttonText('Create Beacon'))).toBeFalsy();
  });

  it('should open the list of beacons when the My Beacons button is clicked', function() {
    var button = ptor.findElement(protractor.By.buttonText('My\nBeacons'));
    button.click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
    button.click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard');
  });

  it('should display a button that the user can click to view their profile', function() {
    ptor.findElement(protractor.By.buttonText('My\nProfile')).click();
    expect(browser.getCurrentUrl()).toContain('/#/profile');
  });
});