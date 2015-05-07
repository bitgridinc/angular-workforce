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
              [ $rootScope.dataFromServer.currentOrganization.center.lat, $rootScope.dataFromServer.currentOrganization.center.lng ],
              [ newlySelectedBeacon.lat, newlySelectedBeacon.lng ]
            ];
            MapExtentService.ensureContainsPoints(mustContainPoints);
          }
        });

        // Adds icon centered over the utility headquarters
        // TODO: Test coverage
        /*$rootScope.$watch('dataFromServer.currentOrganization', function(organization) {
          console.log('dataFromServer.currentOrganization changed: ', organization);
          if (angular.isDefined(organization) && angular.isDefined(organization.center)) {
            var homeIcon = L.icon({
              iconUrl: '/images/orange_utility_marker.png',
              iconSize: [32, 32]
            });
            leafletData.getMap('leaflet').then(function(map) {
              L.marker([organization.center.lat, organization.center.lng], { icon: homeIcon }).addTo(map);
            });
          }
        });*/
      }
    ]
  );
