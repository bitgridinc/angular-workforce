"use strict";

require('./_module')
  .controller('MouseLocationController',
    [         '$scope', 'leafletData', 'UsngService',
      function($scope,   leafletData,   UsngService) {
        function latlngToUSNG(latlng) {
          return UsngService.LLtoUSNG(latlng.lat, latlng.lng)
        }

        leafletData.getMap('leaflet').then(function(map) {
          $scope.mouseLocation = {};
          map.on('mousemove', function(args) {
            $scope.mouseLocation.usng = latlngToUSNG(args.latlng);
          });

          map.on('click', function(args) {
            $scope.beaconData.usng = latlngToUSNG(args.latlng);
          });
        });
      }
    ]
  );
