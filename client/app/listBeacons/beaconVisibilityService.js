"use strict";

require('./_module')
  .service('BeaconVisibilityService',
    [         '_',
      function(_) {
        // TODO: filter beacons where beacon.senderId === currentEntity.id &&
        return {
          filterBeacons: function(beacons) {
            return beacons;
          }
        };
      }
    ]
  );
