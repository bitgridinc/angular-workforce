"use strict";

require('./_module')
  .controller('BeaconDetailsController',
    [         '$rootScope', '$scope',
      function($rootScope,   $scope) {
        // TODO: Why with nested scope do I need this?
        $rootScope.selectionState = $scope.selectionState = {
          currentBeacon: undefined
        };

        $rootScope.$watch('dataFromServer.beacons.length', function(newVal, oldVal) {
          console.log('The number of beacons changed', newVal, oldVal);
          $rootScope.selectionState.currentBeacon = $rootScope.findBeaconById($rootScope.$stateParams.id);
        });

        $scope.goToReviewAssistance = function() {
          $rootScope.userNavigationService.navigateTo(
            'dashboard.beacons.detail.review.response',
            { responseId: $rootScope.selectionState.currentBeacon.responses[0].id });
        };
      }
    ]
  );
