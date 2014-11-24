"use strict";

angular.module('services.userSelection', [])
  .service('UserSelectionService', function() {
    var currentlySelectedBeacon;
    return {
      get currentlySelectedBeacon() {
        return currentlySelectedBeacon;
      },
      // The Tell-Don't-Ask principle says that toggling logic must reside within this service.
      toggleBeaconSelection: function(possiblySelectedBeacon) {
        console.log("toggleBeaconSelection called with:", possiblySelectedBeacon);
        if (angular.isUndefined(currentlySelectedBeacon)) {
          currentlySelectedBeacon = possiblySelectedBeacon;
        } else {
          currentlySelectedBeacon = undefined;
        }
      }
    }
  });