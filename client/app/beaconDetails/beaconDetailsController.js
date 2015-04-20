"use strict";

require('./_module')
  .controller('BeaconDetailsController',
    [         '$scope', '$rootScope', 'leafletData',
      function($scope,   $rootScope,   leafletData) {
        $rootScope.selectionState = $scope.selectionState = {
          currentBeacon: undefined
        };

        $rootScope.$watch('dataFromServer.beacons.length', function(newVal, oldVal) {
          console.log('The number of beacons changed', newVal, oldVal);
          $rootScope.selectionState.currentBeacon = $rootScope.findBeaconById($rootScope.$stateParams.id);
        });

        // TODO: Use a service wrapper around leafletData?
        // TODO: Test
        $rootScope.$watch('selectionState.currentBeacon', function(newVal) {
          if (angular.isDefined(newVal)) {
            leafletData.getMap('leaflet').then(function(map) {

              var mustContainPoints = [
                [$rootScope.dataFromServer.currentEntity.center.lat, $rootScope.dataFromServer.currentEntity.center.lng],
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

        $scope.goToBeaconList = function() { $rootScope.userNavigationService.navigateTo('dashboard.beacons.list'); };
        $scope.goToOfferAssistance = function() { $rootScope.userNavigationService.navigateTo('dashboard.beacons.detail.assist'); };
        $scope.goToReviewAssistance = function() { $rootScope.userNavigationService.navigateTo('dashboard.beacons.detail.review.response',  { responseId: $rootScope.selectionState.currentBeacon.responses[0].id }); };
      }
    ]
  );
