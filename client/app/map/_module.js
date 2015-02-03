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
          center: {
            lat: 43.428,
            lng: -76.215,
            zoom: 8
          },
          socketState: $rootScope.socketState
        });

        leafletData.getMap('leaflet').then(function(map) {
          L.esri.basemapLayer('Streets').addTo(map);
          L.Control.geocoder().addTo(map);
        });
      }
    ]
  );