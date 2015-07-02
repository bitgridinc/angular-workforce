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

        console.log('Browser support: ', L && L.esri && L.esri.Support);

        // Create the utility HQ icon once
        var utilityHqIcon = L.icon({
          iconUrl: '/images/orange_utility_marker.png',
          iconSize: [32, 32]
        });

        leafletData.getMap('leaflet').then(function(map) {
          // see: https://github.com/Leaflet/Leaflet/issues/766
          L.Icon.Default.imagePath = 'bower/leaflet/dist/images';

          L.esri.basemapLayer('Topographic').addTo(map);
          L.esri.featureLayer('http://services5.arcgis.com/yk7EooUDkOKQA9zj/ArcGIS/rest/services/beacons/FeatureServer/0').addTo(map);
          L.esri.featureLayer('http://services5.arcgis.com/yk7EooUDkOKQA9zj/arcgis/rest/services/tn_utilities/FeatureServer/0', {
            // Adds icon centered over the utility headquarters
            pointToLayer: function(geojson, latlng) {
              return L.marker(latlng, {
                icon: utilityHqIcon
              });
            }
          }).addTo(map);

          // The useCors here requires an explanation. Without it, this request will return no Access-Control-Allow-Origin
          // header. I'm able to GET with my browser or Postman. I do now know why this server does not respond to this
          // request when using CORS, but have a hunch it has to do with how this service is running ArcGIS 10. See the
          // following comment by the creator of esri-leaflet on issue 381 for the hint:
          // "useCors: false // this is probably only needed if the service is on a sever before 10.1"
          // https://github.com/Esri/esri-leaflet/issues/381
          L.esri.dynamicMapLayer('http://maps1.arcgisonline.com/ArcGIS/rest/services/NGA_US_National_Grid/MapServer', {
            opacity: 0.5,
            useCors: false
          }).addTo(map);
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
      }
    ]
  );
