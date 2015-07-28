"use strict";

require('./_module')
  .controller('BeaconControlController',
    [         '$scope', 'NavigationService',
      function($scope,   NavigationService) {
        function isMyBeaconsViewOpen() {
          return NavigationService.doesNavigationStateInclude('dashboard.beacons');
        }

        $scope.isToggled = isMyBeaconsViewOpen();
        $scope.toggleMyBeaconsButton = function() {
          if (isMyBeaconsViewOpen()) {
            NavigationService.navigateTo('dashboard');
            $scope.isToggled = false;
          } else {
            NavigationService.navigateTo('dashboard.beacons.create');
            $scope.isToggled = true;
          }
        };
      }
    ]
  );
