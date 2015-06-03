"use strict";

var offerAssistanceLocators = new (require('./locators.js'))()
  , directiveLocators = new (require('../../../common/directives/aat/locators.js'))();

function assistBeacon(beaconId) {
  browser.get('/#/dashboard/beacons/' + beaconId + '/assist');
}
function clickButtonToOfferAssistance() {
  browser.findElement(offerAssistanceLocators.assistButton).click();
}

describe('the offer assistance view', function() {
  describe('when offering assistance to beacon 30', function() {
    beforeEach(function() {
      assistBeacon(30);
    });

    // TODO: I'd like some way to ensure that there is a defined beacon in scope
    /*it('should display the name of the company you\'re offering to help', function() {
     expect(element(by.text('has requested')).isPresent()).toBeTruthy();
     });*/

    it('should navigate to the list of beacons when an offer is sent', function() {
      clickButtonToOfferAssistance();
      expect(browser.getCurrentUrl()).not.toContain('/assist');
      expect(browser.getCurrentUrl()).not.toContain('/detail');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
      // TODO: Ensure something changes on the UI. This should not be checking whether the review offers button appears.
    });
  });

  it('submitting an offer to beacon 34 should navigate the user back to the beacon list where a third review offers button appears', function() {
    // Arrange
    assistBeacon(34);

    // Act
    clickButtonToOfferAssistance();

    // Assert
    expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
    expect(element.all(directiveLocators.reviewOffersButton).count()).toBe(3);
  });
});
