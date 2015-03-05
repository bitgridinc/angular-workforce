"use strict";

require('./_module')
  .controller('MapController',
    [         '$scope', '$rootScope', 'leafletData',
      function($scope,   $rootScope,   leafletData) {
        angular.extend($scope, {
          defaults: {
            // Note: This MUST be "" as any other values negatively affect the performance of loading tiles. Don't know why.
            tileLayer: "",
            zoomControl: false,
            attributionControl: false
          },
          dataFromServer: $rootScope.dataFromServer
        });

        leafletData.getMap('leaflet').then(function(map) {
          L.esri.basemapLayer('Streets').addTo(map);
          L.Control.geocoder().addTo(map);

          var miniMapLayer = L.esri.basemapLayer('Streets', {
            hideLogo: true,
            minZoom: 0,
            maxZoom: 13
          });
          new L.Control.MiniMap(miniMapLayer, {
            toggleDisplay: true,
            zoomLevelOffset: -6
          }).addTo(map);
        });

        // Adds icon centered over the utility headquarters
        // TODO: Test coverage
        $rootScope.$watch('dataFromServer.currentEntity', function(entity) {
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
        });
      }
    ]
  );
