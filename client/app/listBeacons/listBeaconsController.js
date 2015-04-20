"use strict";

require('./_module')
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope', 'UserNavigationService',
      function($scope,    $rootScope,   UserNavigationService) {
        $scope.beacons = $rootScope.dataFromServer.beacons;

        // We don't require logic for backing up as the Create Beacon view covers this functionality
        $scope.onCreateBeaconClick = function() {
          UserNavigationService.go('^.create');
        };

        $scope.onSelectBeacon = function(beacon) {
          UserNavigationService.go('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function(beacon) {
          UserNavigationService.go('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
