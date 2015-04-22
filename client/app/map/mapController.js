"use strict";

require('./_module')
  .controller('MapController',
    [         '$scope', '$rootScope', 'MapExtentService',
      function($scope,   $rootScope,   MapExtentService) {
        console.log('Entering MapController: ', $rootScope);
        //$scope.dataFromServer = $rootScope.dataFromServer;

        /*leafletData.getMap('leaflet').then(function(map) {
          L.esri.basemapLayer('Streets').addTo(map);
        });*/

        // TODO: Test (perhaps break away first)
        $rootScope.$watch('$stateParams.id', function(newlySelectedBeaconId) {
          var newlySelectedBeacon = $rootScope.findBeaconById(newlySelectedBeaconId);
          if (angular.isDefined(newlySelectedBeacon)) {
            var mustContainPoints = [
              [ $rootScope.dataFromServer.currentEntity.center.lat, $rootScope.dataFromServer.currentEntity.center.lng ],
              [ newlySelectedBeacon.lat, newlySelectedBeacon.lng ]
            ];
            MapExtentService.ensureContainsPoints(mustContainPoints);
          }
        });

        // Adds icon centered over the utility headquarters
        // TODO: Test coverage
        /*$rootScope.$watch('dataFromServer.currentEntity', function(entity) {
          console.log('dataFromServer.currentEntity changed: ', entity);
          if (angular.isDefined(entity) && angular.isDefined(entity.center)) {
            var homeIcon = L.icon({
              iconUrl: '/images/orange_utility_marker.png',
              iconSize: [32, 32]
            });
            leafletData.getMap('leaflet').then(function(map) {
              L.marker([entity.center.lat, entity.center.lng], { icon: homeIcon }).addTo(map);
            });
          }
        });*/
      }
    ]
  );
