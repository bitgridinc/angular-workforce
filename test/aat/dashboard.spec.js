"use strict";

describe('the dashboard page', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/dashboard');
  });

  it('should have a button that says My\\nCompany', function() {
    var myCompanyBtn = ptor.findElement(protractor.By.className('db-btn'));
    expect(myCompanyBtn.getText()).toBe('My\nCompany');
  });
  // This is hackish since I couldn't get the line By.tagName('leaflet') to work...
  it('should have a leaflet element', function() {
    ptor.findElement(protractor.By.id('leaflet'));
  });
});