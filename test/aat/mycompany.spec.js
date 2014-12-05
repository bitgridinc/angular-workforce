"use strict";

describe('the My Company button', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard');
  });

  it('should change the url when clicked', function() {
    ptor.findElement(protractor.By.className('db-btn')).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany');
  });
});