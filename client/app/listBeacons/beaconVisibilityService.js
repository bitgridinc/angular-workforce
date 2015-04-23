"use strict";

require('./_module')
  .service('BeaconVisibilityService',
    [         '_', '$rootScope',
      function(_,   $rootScope) {
        return {
          filterBeacons: function(beacons) {
            return _.filter(beacons, function(beacon) {
              // TODO: allow sent ones with responses and no accepted
              return beacon.senderId !== $rootScope.dataFromServer.currentEntity.id ||
                     beacon.responses.length > 0;
            });
          }
        };
      }
    ]
  );
