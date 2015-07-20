"use strict";

var BeaconDetailsController = function () {

};

require('./_module')
  .controller('BeaconDetailsController',
    [         '$rootScope', '$scope',
      function($rootScope,   $scope) {
        var cleanup;

        // Note that the OfferAssistance and ReviewAssistance views are not nested
        // under the BeaconDetails view, so we must use $rootScope instead of $scope.
        $rootScope.selectionState = {
          currentBeacon: undefined
        };

        cleanup = $scope.$watch('dataFromServer.beacons.length', function(newVal, oldVal) {
          console.log('The number of beacons changed', newVal, oldVal);
          $scope.selectionState.currentBeacon = $scope.findBeaconById($scope.$stateParams.id);
        });

        $scope.goToReviewAssistance = function() {
          $scope.navigationService.navigateTo(
            'dashboard.beacons.detail.review.response',
            { responseId: $scope.selectionState.currentBeacon.responses[0].id });
        };

        $scope.$on('$destroy', function() {
          cleanup();
        });
      }
    ]
  );
