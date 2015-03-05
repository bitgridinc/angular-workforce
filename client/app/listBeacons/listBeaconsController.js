"use strict";

require('./_module')
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope', 'state',
      function($scope,    $rootScope,   state) {
        $scope.beacons = $rootScope.dataFromServer.beacons;

        // We don't require logic for backing up as the Create Beacon view covers this functionality
        $scope.onCreateBeaconClick = function() {
          state.go('^.create');
        };

        $scope.onSelectBeacon = function(beacon) {
          state.go('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function(beacon) {
          state.go('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
