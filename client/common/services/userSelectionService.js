"use strict";

angular.module('services.userSelection', [])
  .service('UserSelectionService', function() {
    var currentlySelectedBeacon;
    return {
      get currentlySelectedBeacon() {
        return currentlySelectedBeacon;
      },
      selectBeacon: function(newlySelectedBeacon) {
        currentlySelectedBeacon = newlySelectedBeacon;
      },
      deselectBeacon: function() {
        currentlySelectedBeacon = undefined;
      }
    }
  });