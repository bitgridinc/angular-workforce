"use strict";

require('./_module_init.js')
  .service('DashboardUiState',
    function() {
      var currentlySelectedBeacon;
      return {
        get currentlySelectedBeacon() {
          return currentlySelectedBeacon;
        },
        // The Tell-Don't-Ask principle says that toggling logic must reside within this service.
        // Note: We want to toggle here because the wire-frame states the summary must be clicked to close the details page.
        focusBeaconId: function(beaconId) {
          console.log("focusBeaconId called with:", beaconId);
          if (angular.isUndefined(currentlySelectedBeacon)) {
            currentlySelectedBeacon = beaconId;
          } else {
            currentlySelectedBeacon = undefined;
          }
        }
      }
    }
  );