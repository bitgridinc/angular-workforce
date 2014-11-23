"use strict";

angular.module('services.beaconDetailsFromSummary', [])
  .service('BeaconDetailsFromSummaryService', function() {
    var displayedBeacon;
    return {
      get currentBeacon() {
        return displayedBeacon;
      },
      displayBeaconDetails: function(beaconToDisplay) {
        displayedBeacon = beaconToDisplay;
      },
      closeBeaconDetails: function() {
        displayedBeacon = undefined;
      }
    }
  });