"use strict";

require('./_module')
  .service('BeaconVisibilityService',
    [         '_', '$rootScope',
      function(_,   $rootScope) {
        return {
          filterBeacons: function(beacons) {
            return _.filter(beacons, function(beacon) {
              // We should only see beacons from other utilities or our own that have responses with none yet accepted
              return beacon.senderId !== $rootScope.dataFromServer.currentEntity.id ||
                     (beacon.responses.length > 0 &&
                      beacon.acceptedAssistance.length === 0);
            });
          }
        };
      }
    ]
  );
