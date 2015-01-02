"use strict";

angular
  .module('modules.listBeacons', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.mycompany.list', {
            name: 'dashboard.mycompany.list',
            parent: 'dashboard.mycompany',
            url: '',
            views: {
              'left': {
                templateUrl: 'templates/listBeacons/view.tpl.html',
                controller: 'ListBeaconsController'
              }
            }
          })
      }
    ]
  )
  .controller('ListBeaconsController',
    [         '$scope',  '$rootScope', '$state',
      function($scope,    $rootScope,   $state) {
        // For debugging purposes
        $scope.name = 'ListBeaconsController';
        $scope.beacons = $rootScope.requestService.beacons;

        // We don't require logic for backing up as the Create Beacon view covers this functionality
        $scope.onCreateBeaconClick = function () {
          $state.go('^.create');
        };

        $scope.onSelectBeacon = function (beacon) {
          console.log('onSelectBeacon called with:', beacon);
          $state.go('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function (beacon) {
          $state.go('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
