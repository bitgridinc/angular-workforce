"use strict";

var CloseablePanelLocators = require('./closeablePanel.locators.js');

describe('all closeable panels', function() {
  var ptor,
      closeablePanelLocators;

  function testCloseablePanelCloseButton(name, url, assert) {
    describe(name, function() {
      beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get(url);
        closeablePanelLocators = new CloseablePanelLocators();
        ptor.findElement(closeablePanelLocators.closeButton).click();
      });

      it('should close the panel after the close button is clicked', assert);
    });
  }

  testCloseablePanelCloseButton(
    'review assistance',
    '/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/review',
    function() {
      expect(browser.getCurrentUrl()).not.toContain('/review');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
    }
  );

  testCloseablePanelCloseButton(
    'offer assistance',
    '/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b/assist',
    function() {
      expect(browser.getCurrentUrl()).not.toContain('/assist');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/detail/e688af0b-63df-48bc-941c-9cc5f750367b');
    }
  );
});
