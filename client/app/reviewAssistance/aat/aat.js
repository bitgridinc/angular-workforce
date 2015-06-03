// go to url and ensure text appears
"use strict";

var reviewAssistanceLocators = new (require('./locators.js'))()
  , listBeaconsLocators = new (require('../../listBeacons/aat/locators.js'))();

function expectOfferInformationDisplayedToBeTruthy(organizationName) {
  var organizationCard = element(reviewAssistanceLocators.organizationCard);
  expect(organizationCard.getText()).toContain(organizationName);

  var contactCard = element(reviewAssistanceLocators.contactCard);
  expect(contactCard.getText()).toMatch(/\d{4}$/); // because seeing 4 digits at the end is a good phone number approximation

  var organizationLabelElement = element(reviewAssistanceLocators.organizationLabel);
  expect(organizationLabelElement.getText()).toContain(organizationName);
  expect(organizationLabelElement.getText()).toMatch(/with .+ people/);
  expect(organizationLabelElement.getText()).toMatch(/20\d\d/);
}
function expectAcceptButtonIsPresent() {
  return expect(browser.isElementPresent(reviewAssistanceLocators.acceptButton));
}

describe('the review assistance view', function() {
  describe('when reviewing offers for beacon 30, which was sent by another utility,', function() {
    beforeEach(function() {
      browser.get('/#/dashboard/beacons/30/review/2cf8faaa-5760-41c9-adbf-5a4482ac3469');
    });

    it('should display the name of the organization that offered assistance', function() {
      expectOfferInformationDisplayedToBeTruthy('Morristown Utility Systems');
    });
    it('should not display the button to accept the assistance since it is not the user\'s beacon', function() {
      expectAcceptButtonIsPresent().toBeFalsy();
    });
  });

  describe('when reviewing offers for beacon 32, which was sent by the user\'s utility,', function() {
    beforeEach(function() {
      browser.get('/#/dashboard/beacons/32/review/eb6cd1ad-d115-49de-aac0-cfbb887d9ad0');
    });

    it('should display the name of the organization that offered assistance', function() {
      expectOfferInformationDisplayedToBeTruthy('Murfreesboro Electric Department');
    });
    it('should display the button to accept the assistance since it is the user\'s beacon', function() {
      expectAcceptButtonIsPresent().toBeTruthy();
    });

    describe('when paginating through the paginator to the second offer', function() {
      beforeEach(function() {
        browser.findElement(reviewAssistanceLocators.pageRight).click();
      });

      it('should display the name of the organization that offered assistance', function() {
        expectOfferInformationDisplayedToBeTruthy('Memphis Light, Gas and Water');
      });
      it('accepting the offer should send the user to the beacon list where beacon 32 is no longer there', function() {
        // Act
        browser.findElement(reviewAssistanceLocators.acceptButton).click();

        // Assert
        expect(browser.getCurrentUrl()).toMatch('/#/dashboard/beacons$');
        expect(element.all(listBeaconsLocators.beaconSummaryDirective).count()).toBe(3);
      });
    });
  });
});
