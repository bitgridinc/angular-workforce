/*"use strict";

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
    '/#/dashboard/beacons/117/review',
    function() {
      expect(browser.getCurrentUrl()).not.toContain('/review');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/117');
    }
  );

  testCloseablePanelCloseButton(
    'offer assistance',
    '/#/dashboard/beacons/117/assist',
    function() {
      expect(browser.getCurrentUrl()).not.toContain('/assist');
      expect(browser.getCurrentUrl()).toContain('/#/dashboard/beacons/117');
    }
  );
});*/
