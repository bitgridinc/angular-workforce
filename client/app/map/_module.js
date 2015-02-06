"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/leaflet/dist/leaflet-src');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');

angular
  .module('modules.map', [
      'leaflet-directive'
    ]
  )
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
          socketState: $rootScope.socketState
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
        $rootScope.$watch('socketState.currentEntity', function(newVal) {
          if (angular.isDefined(newVal)) {
            var homeIcon = L.icon({
              iconUrl: '/images/electric-home.png',
              iconSize: [32, 32]
            });
            leafletData.getMap('leaflet').then(function(map) {
              L.marker([newVal.center.lat, newVal.center.lng], { icon: homeIcon }).addTo(map);
            });
          }
        });
      }
    ]
  );
