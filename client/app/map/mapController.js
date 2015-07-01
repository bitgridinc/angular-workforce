"use strict";

require('./_module')
  .controller('MapController',
    [         '$scope', '$rootScope', 'MapExtentService', 'leafletData',
      function($scope,   $rootScope,   MapExtentService,   leafletData) {
        console.log('Entering MapController: ', $rootScope);
        angular.extend($scope, {
          defaults: {
            // Note: This MUST be "" as any other values negatively affect the performance of loading tiles. Don't know why.
            tileLayer: "",
            zoomControl: false,
            attributionControl: false,
            center: {
              lat: 35.885,
              lng: -85.96,
              zoom: 7
            }
          },
          dataFromServer: $rootScope.dataFromServer
        });

        leafletData.getMap('leaflet').then(function(map) {
          // see: https://github.com/Leaflet/Leaflet/issues/766
          L.Icon.Default.imagePath = 'bower/leaflet/dist/images';

          L.esri.basemapLayer('Topographic').addTo(map);
          L.esri.featureLayer('http://services5.arcgis.com/yk7EooUDkOKQA9zj/ArcGIS/rest/services/beacons/FeatureServer/0').addTo(map);
          L.esri.featureLayer('http://services5.arcgis.com/yk7EooUDkOKQA9zj/arcgis/rest/services/tn_utilities/FeatureServer/0').addTo(map);
          L.esri.dynamicMapLayer('http://maps1.arcgisonline.com/ArcGIS/rest/services/NGA_US_National_Grid/MapServer').addTo(map);
        });

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
