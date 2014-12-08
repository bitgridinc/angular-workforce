"use strict";

var OfferAssistanceLocators = require('./offerAssistance.locators.js');

describe('the beacon details view', function() {
  var ptor,
      offerAssistanceLocators;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany/detail/0/assist');
  });

  beforeEach(function() {
    offerAssistanceLocators = new OfferAssistanceLocators();
  });

  // TODO: I'd like some way to ensure that there is a defined beacon in scope
  /*it('should display the name of the company you\'re offering to help', function() {
    expect(element(by.text('has requested')).isPresent()).toBeTruthy();
  });*/

  describe('the assist button', function() {
    it('should change the url when clicked', function() {
      ptor.findElement(offerAssistanceLocators.assistButton).click();
      expect(browser.getCurrentUrl()).not.toContain('/assist');
    });
  });
});
