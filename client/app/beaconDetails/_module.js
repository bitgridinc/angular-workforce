"use strict";

angular
  .module('modules.beaconDetails', [
      'ui.router',
      'modules.providers',
      'leaflet-directive'
    ]
  )
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.detail', {
            name: 'dashboard.beacons.detail',
            parent: 'dashboard.beacons',
            url: '/{id:int}',
            views: {
              'left': {
                templateUrl: 'templates/beaconDetails/view.tpl.html',
                controller: 'BeaconDetailsController'
              }
            }
          });
      }
    ]
  )
  .controller('BeaconDetailsController',
    [         '$scope', '$rootScope', '$state', 'leafletData',
      function($scope,   $rootScope,   $state,   leafletData) {
        $rootScope.selectionState = $scope.selectionState = {
          currentBeacon: undefined
        };

        $rootScope.$watch('socketState.beacons.length', function(newVal, oldVal) {
          console.log('The number of beacons changed', newVal, oldVal);
          $rootScope.selectionState.currentBeacon = $rootScope.findBeaconById($rootScope.$stateParams.id);
        });

        // TODO: Use a service wrapper around leafletData?
        // TODO: Test
        $rootScope.$watch('selectionState.currentBeacon', function(newVal) {
          if (angular.isDefined(newVal)) {
            leafletData.getMap('leaflet').then(function(map) {

              var mustContainPoints = [
                [$rootScope.socketState.currentEntity.center.lat, $rootScope.socketState.currentEntity.center.lng],
                [$rootScope.selectionState.currentBeacon.lat, $rootScope.selectionState.currentBeacon.lng]
              ];

              var bounds = map.getBounds();
              if (!bounds.contains(mustContainPoints[0]) || !bounds.contains(mustContainPoints[1])) {
                map.fitBounds(mustContainPoints, {
                  padding: [50, 50]
                });
              }
            });
          }
        });

        $scope.goToBeaconList = function() { $state.go('dashboard.beacons.list'); };
        $scope.goToOfferAssistance = function() { $state.go('dashboard.beacons.detail.assist'); };
        $scope.goToReviewAssistance = function() { $state.go('dashboard.beacons.detail.review'); };
      }
    ]
  );
