"use strict";

var BeaconDetailsController = function ($rootScope, $scope) {
  // Note that the OfferAssistance and ReviewAssistance views are not nested
  // under the BeaconDetails view, so we must use $rootScope instead of $scope.
  $rootScope.selectionState = {
    currentBeacon: undefined
  };

  var cleanup;
  cleanup = $scope.$watch('dataFromServer.beacons.length', function(newVal, oldVal) {
    console.log('The number of beacons changed', newVal, oldVal);
    // TODO: Can I use a service to manage maintaining the current beacon
    $scope.selectionState.currentBeacon = $scope.findBeaconById($scope.$stateParams.id);
    $scope.$on('$destroy', function() {
      cleanup();
    });
  });
};

BeaconDetailsController.$inject = ['$rootScope', '$scope'];

require('./_module').controller('BeaconDetailsController', BeaconDetailsController);
