"use strict";

angular
  .module('modules.listBeacons', [
      'ui.router'
    ]
  )
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
        $scope.beacons = $rootScope.socketState.beacons;

        // We don't require logic for backing up as the Create Beacon view covers this functionality
        $scope.onCreateBeaconClick = function () {
          console.log('ListBeaconsController.onCreateBeaconClick called.');
          $state.go('^.create');
        };

        $scope.onSelectBeacon = function (beacon) {
          console.log('ListBeaconsController.onSelectBeacon called.');
          $state.go('^.detail', { id: beacon.id });
        };

        $scope.onReviewAssistance = function (beacon) {
          console.log('ListBeaconsController.onReviewAssistance called.');
          $state.go('^.detail.review', { id: beacon.id });
        };
      }
    ]
  );
