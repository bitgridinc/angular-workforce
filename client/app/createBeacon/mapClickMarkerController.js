"use strict";

// TODO: Test this!
require('./_module')
  .controller('MapClickMarkerController',
    [         'leafletData', '$window',
      function(leafletData,   $window) {
        var clickMarker
          , clickLatlng;
        leafletData.getMap('leaflet').then(function(map) {
          map.on('click', function(args) {
            if (clickLatlng) {
              clickLatlng.lat = args.latlng.lat;
              clickLatlng.lng = args.latlng.lng;
              clickMarker.update();
            } else {
              clickLatlng = args.latlng;
              clickMarker = $window.L.marker(clickLatlng);
              clickMarker.addTo(map);
            }
          });
        });
      }
    ]
  );
