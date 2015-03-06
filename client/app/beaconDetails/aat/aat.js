"use strict";

var BeaconControlLocators = require('../../beaconControl/aat/locators.js');
var BeaconDetailsLocators = require('./locators.js');
var BeaconSummaryLocators = require('../../../common/directives/aat/beaconSummary.locators.js');
var MapLocators = require('../../map/aat/locators.js');

describe('the view that displays the details of', function() {
  var ptor,
      beaconControlLocators,
      beaconDetailsLocators,
      beaconSummaryLocators,
      mapLocators;


  beforeEach(function() {
    beaconControlLocators = new BeaconControlLocators();
    beaconDetailsLocators = new BeaconDetailsLocators();
    beaconSummaryLocators = new BeaconSummaryLocators();
    mapLocators = new MapLocators();
  });

  describe('the Tupper Lake beacon', function() {
    beforeEach(function() {
      ptor = protractor.getInstance();
      ptor.get('/#/dashboard/beacons/117');
    });

    it('should display detailed information about the beacon', function() {
      var summaryHeaderElement = element(beaconDetailsLocators.summaryHeader);
      expect(summaryHeaderElement.getText()).toContain('Tupper Lake');
      expect(summaryHeaderElement.getText()).toContain('Your Title');
      expect(summaryHeaderElement.getText()).toContain('Your Description');
      expect(element(beaconDetailsLocators.streetAddress).getText()).toContain('53 Park Street');
    });

    it('should ensure the beacon and utility headquarters are visible on the map', function() {
      var markersPromise = ptor.findElements(mapLocators.marker);
      protractor.promise.filter(markersPromise, function(marker) {
        return marker.isDisplayed();
      })
        .then(function(visibleMarkers) {
          // This is the best I know how to test right now. With few markers on the map, it's likely it will stay valid.
          expect(visibleMarkers.length).toBeGreaterThan(1);
        });
    });

    it('should go back to the list of beacons when the summary header (with the back symbol) is clicked', function() {
      expect(ptor.isElementPresent(beaconDetailsLocators.goBack)).toBeFalsy();
      ptor.findElement(beaconDetailsLocators.summaryHeader).click();
      expect(browser.getCurrentUrl()).not.toContain('/117');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons');
    });

    it('should close the entire left control when the My Beacons button (in the upper left) is clicked', function() {
      ptor.findElement(beaconControlLocators.myBeaconsButton).click();
      expect(browser.getCurrentUrl()).not.toContain('/beacons');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard');
    });

    it('should display a button that allows the user to review offers of assistance', function() {
      ptor.findElement(beaconSummaryLocators.reviewOffersButton).click();
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/117/review');
    });
  });

  /* TODO: FIX FIRST */
  /*describe('the Solvay beacon', function() {
    beforeEach(function() {
      ptor = protractor.getInstance();
      ptor.get('/#/dashboard/beacons/1337');
    });

    it('should display a button that allows the user to offer assistance to the sender of the beacon', function() {
      ptor.findElement(beaconDetailsLocators.offerAssistance).click();
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/1337/assist');
    });
  });*/
});
