"use strict";

require('./_module')
  .controller('BeaconControlController',
    [         '$scope', 'UserNavigationService',
      function($scope,   UserNavigationService) {
        function isMyBeaconsViewOpen() {
          return UserNavigationService.doesUserNavigationStateInclude('dashboard.beacons');
        }

        $scope.isToggled = isMyBeaconsViewOpen();
        $scope.toggleMyBeaconsButton = function() {
          if (isMyBeaconsViewOpen()) {
            UserNavigationService.navigateTo('dashboard');
            $scope.isToggled = false;
          } else {
            UserNavigationService.navigateTo('dashboard.beacons.list');
            $scope.isToggled = true;
          }
        };
      }
    ]
  );
