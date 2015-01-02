"use strict";

describe('having the My Company button clicked to view the list of existing beacons', function() {
  var ptor,
      CREATE_BEACON_TEXT = 'Create Beacon';

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/dashboard/mycompany');
  });

  it('should display a button to create a new beacon', function() {
    ptor.findElement(protractor.By.buttonText(CREATE_BEACON_TEXT)).click();
    expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/create');
    // Note that we don't have logic for clicking the Create Beacon button twice, so it shouldn't be clickable.
    expect(ptor.isElementPresent(by.buttonText(CREATE_BEACON_TEXT))).toBeFalsy();
  });

  describe('clicking an existing beacon', function() {
    beforeEach(function() {
      ptor.findElement(protractor.By.css('beacon-summary')).click();
    });

    it('should expand the beacon to view its details', function() {
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/mycompany/detail/');
      expect(ptor.isElementPresent(by.buttonText(CREATE_BEACON_TEXT))).toBeFalsy();
    });
  });
});
