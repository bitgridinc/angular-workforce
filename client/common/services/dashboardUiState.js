"use strict";

var app = require('./_module_init.js');

app.service('DashboardUiState', ['$rootScope', function($rootScope) {
  var currentlySelectedBeacon;
  return {
    isMyCompanyButtonToggled: false,
    isCreatingBeacon: false,
    isSelectingServices: false,
    isOfferingAssistance: false,
    isReviewingOfferOfAssistance: false,
    get currentlySelectedBeacon() {
      return currentlySelectedBeacon;
    },
    // The Tell-Don't-Ask principle says that toggling logic must reside within this service.
    // Note: We want to toggle here because the wire-frame states the summary must be clicked to close the details page.
    toggleBeaconSelection: function(possiblySelectedBeacon) {
      console.log("toggleBeaconSelection called with:", possiblySelectedBeacon);
      if (angular.isUndefined(currentlySelectedBeacon)) {
        currentlySelectedBeacon = possiblySelectedBeacon;
      } else {
        currentlySelectedBeacon = undefined;
      }

      // TODO: Check if this can simplify our code elsewhere
      $rootScope.$broadcast('currentBeaconChanged', currentlySelectedBeacon);
    }
  }
}]);