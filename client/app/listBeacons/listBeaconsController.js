"use strict";

require('./_module')
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope',
      function($scope,    $rootScope) {
        $scope.beacons = $rootScope.dataFromServer.beacons;

        // We don't require logic for backing up as the Create Beacon view covers this functionality
        $scope.onCreateBeaconClick = function() {
          $rootScope.userNavigationService.go('^.create');
        };

        $scope.onSelectBeacon = function(beacon) {
          $rootScope.userNavigationService.go('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function(beacon) {
          $rootScope.userNavigationService.go('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
