"use strict";

describe('having the My Company button toggled on', function() {
  var ptor,
      CREATE_BEACON_TEXT = 'Create Beacon',
      SUBMIT_BEACON_TEXT = 'Submit Beacon';

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany');
  });

  it('should display the user\'s beacon summary list', function() {
    expect(element(by.buttonText(CREATE_BEACON_TEXT)).isDisplayed()).toBeTruthy();
  });
  it('should not be displaying create beacon view', function() {
    expect(ptor.isElementPresent(by.buttonText(SUBMIT_BEACON_TEXT))).toBeFalsy();
  });

  describe('selecting the first beacon', function() {
    beforeEach(function() {
      ptor.findElement(protractor.By.css('beacon-summary')).click();
    });

    it('should change the url', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/');
    });
    it('should obscure the beacon list', function() {
      expect(ptor.isElementPresent(by.buttonText(CREATE_BEACON_TEXT))).toBeFalsy();
    });
    it('should still be visible to enable deselecting', function() {
      ptor.findElement(protractor.By.css('beacon-summary'));
    });
  });

  describe('clicking the Create Beacon button', function() {
    beforeEach(function() {
      ptor.findElement(protractor.By.buttonText(CREATE_BEACON_TEXT)).click();
    });

    it('should change the url', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/create');
    });
    it('should obscure itself', function() {
      // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
      expect(ptor.isElementPresent(by.buttonText(CREATE_BEACON_TEXT))).toBeFalsy();
    });
  });
});
