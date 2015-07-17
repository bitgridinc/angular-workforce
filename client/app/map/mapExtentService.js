"use strict";

require('./_module')
  .service('MapExtentService',
    [         'LeafletService',
      function(LeafletService) {
        return {
          ensureContainsPoints: function(pointsToContain) {
            console.log('ensureContainsPoints called with: ', pointsToContain);
            LeafletService.onMap(function(map) {
              var bounds = map.getBounds();
              if (!bounds.contains(pointsToContain[0]) || !bounds.contains(pointsToContain[1])) {
                map.fitBounds(pointsToContain, {
                  padding: [50, 50]
                });
              }
            });
          }
        }
      }
    ]
  );
