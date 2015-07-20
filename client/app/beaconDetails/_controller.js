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
    $scope.selectionState.currentBeacon = $scope.findBeaconById($scope.$stateParams.id);
    $scope.$on('$destroy', function() {
      cleanup();
    });
  });

  $scope.goToReviewAssistance = function() {
    $scope.navigationService.navigateTo(
      'dashboard.beacons.detail.review.response',
      { responseId: $scope.selectionState.currentBeacon.responses[0].id });
  };
};

BeaconDetailsController.$inject = ['$rootScope', '$scope'];

require('./_module').controller('BeaconDetailsController', BeaconDetailsController);
