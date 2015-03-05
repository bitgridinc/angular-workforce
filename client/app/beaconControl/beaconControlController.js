"use strict";

require('./_module')
  .controller('BeaconControlController',
    [         '$scope', '$state', 'state',
      function($scope,   $state,   state) {
        function isMyBeaconsViewOpen() {
          return $state.includes('dashboard.beacons');
        }

        $scope.isToggled = isMyBeaconsViewOpen();
        $scope.toggleMyBeaconsButton = function() {
          if (isMyBeaconsViewOpen()) {
            state.go('dashboard');
            $scope.isToggled = false;
          } else {
            state.go('dashboard.beacons.list');
            $scope.isToggled = true;
          }
        };
      }
    ]
  );
