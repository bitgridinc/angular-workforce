"use strict";

require('./_module')
  .controller('BeaconControlController',
    [         '$scope', '$state', 'UserNavigationService',
      function($scope,   $state,   UserNavigationService) {
        function isMyBeaconsViewOpen() {
          return $state.includes('dashboard.beacons');
        }

        $scope.isToggled = isMyBeaconsViewOpen();
        $scope.toggleMyBeaconsButton = function() {
          if (isMyBeaconsViewOpen()) {
            UserNavigationService.go('dashboard');
            $scope.isToggled = false;
          } else {
            UserNavigationService.go('dashboard.beacons.list');
            $scope.isToggled = true;
          }
        };
      }
    ]
  );
