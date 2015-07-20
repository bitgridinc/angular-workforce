"use strict";

require('./_module')
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope',
      function($scope,    $rootScope) {
        $scope.onSelectBeacon = function(beacon) {
          $rootScope.navigationService.navigateTo('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function(beacon) {
          $rootScope.navigationService.navigateTo('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
