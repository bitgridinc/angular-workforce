"use strict";

require('./_module')
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope',
      function($scope,    $rootScope) {
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
