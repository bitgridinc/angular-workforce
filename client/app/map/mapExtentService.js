"use strict";

require('./_module')
  .service('MapExtentService',
    [         '$rootScope',
      function($rootScope) {
        return {
          ensureContainsPoints: function(pointsToContain) {
            console.log('ensureContainsPoints called with: ', pointsToContain);
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
