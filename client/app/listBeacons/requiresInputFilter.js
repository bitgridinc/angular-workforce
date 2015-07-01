"use strict";

require('./_module')
  .filter('requiresInput',
    [         '_', '$rootScope',
      function(_,   $rootScope) {
        return function(beacons) {
          // TODO: Why does this keep getting called?
          // console.log("Requires Input: ", beacons);
          return _.filter(beacons, function(beacon) {
            // We should only see beacons from other utilities or our own that have responses with none yet accepted
            return beacon.senderId !== $rootScope.dataFromServer.currentOrganization.id ||
                   (beacon.responses.length > 0 &&
                    beacon.acceptedAssistance.length === 0);
          });
        };
      }
    ]
  );
