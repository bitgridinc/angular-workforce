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
          .state('dashboard.beacons.list', {
            name: 'dashboard.beacons.list',
            parent: 'dashboard.beacons',
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
    [         '$scope',  '$rootScope', 'state',
      function($scope,    $rootScope,   state) {
        $scope.beacons = $rootScope.socketState.beacons;

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
