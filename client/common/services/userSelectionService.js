"use strict";

angular.module('services.userSelection', [])
  .service('UserSelectionService', function() {
    var currentlySelectedBeacon;
    return {
      get currentlySelectedBeacon() {
        return currentlySelectedBeacon;
      },
      selectBeacon: function(newlySelectedBeacon) {
        console.log("selectBeacon called with:", newlySelectedBeacon);
        currentlySelectedBeacon = newlySelectedBeacon;
      },
      deselectBeacon: function() {
        console.log("deselectBeacon called");
        currentlySelectedBeacon = undefined;
      }
    }
  });