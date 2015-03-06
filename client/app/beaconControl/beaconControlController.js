"use strict";

require('./_module')
  .controller('BeaconControlController',
    [         '$scope', '$state', 'StateService',
      function($scope,   $state,   StateService) {
        function isMyBeaconsViewOpen() {
          return $state.includes('dashboard.beacons');
        }

        $scope.isToggled = isMyBeaconsViewOpen();
        $scope.toggleMyBeaconsButton = function() {
          if (isMyBeaconsViewOpen()) {
            StateService.go('dashboard');
            $scope.isToggled = false;
          } else {
            StateService.go('dashboard.beacons.list');
            $scope.isToggled = true;
          }
        };
      }
    ]
  );
