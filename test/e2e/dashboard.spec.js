"use strict";

describe('dashboard page', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/dashboard');
  });

  it('should have a db-btn button that says My\\nCompany', function() {
    var myCompanyBtn = ptor.findElement(protractor.By.className('db-btn'));
    expect(myCompanyBtn.getText()).toBe('My\nCompany');
  });
});