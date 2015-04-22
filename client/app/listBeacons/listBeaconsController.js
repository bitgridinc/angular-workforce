"use strict";

require('./_module')
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope', 'BeaconVisibilityService',
      function($scope,    $rootScope,   BeaconVisibilityService) {
        $scope.beacons = BeaconVisibilityService.filterBeacons($rootScope.dataFromServer.beacons);

        // We don't require logic for backing up as the Create Beacon view covers this functionality
        $scope.onCreateBeaconClick = function() {
          $rootScope.userNavigationService.navigateTo('^.create');
        };

        $scope.onSelectBeacon = function(beacon) {
          $rootScope.userNavigationService.navigateTo('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function(beacon) {
          $rootScope.userNavigationService.navigateTo('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
