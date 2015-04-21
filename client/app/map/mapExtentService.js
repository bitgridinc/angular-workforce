"use strict";

require('./_module')
  .service('MapExtentService',
    [         'esriRegistry',
      function(esriRegistry) {
        return {
          ensureContainsPoints: function(pointsToContain) {
            console.log('ensureContainsPoints called with: ', pointsToContain);
            esriRegistry.get('map').then(function(map) {
              console.log('got a reference to the Esri map from registry: ', map);
            });
            /*leafletData.getMap('leaflet').then(function(map) {
              var bounds = map.getBounds();
              if (!bounds.contains(pointsToContain[0]) || !bounds.contains(pointsToContain[1])) {
                map.fitBounds(pointsToContain, {
                  padding: [50, 50]
                });
              }
            });*/
          }
        }
      }
    ]
  );
