"use strict";

require('./_module')
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope', 'StateService',
      function($scope,    $rootScope,   StateService) {
        $scope.beacons = $rootScope.dataFromServer.beacons;

        // We don't require logic for backing up as the Create Beacon view covers this functionality
        $scope.onCreateBeaconClick = function() {
          StateService.go('^.create');
        };

        $scope.onSelectBeacon = function(beacon) {
          StateService.go('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function(beacon) {
          StateService.go('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
