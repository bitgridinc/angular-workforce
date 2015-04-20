"use strict";

require('./_module')
  .service('MapExtentService',
    [
      function() {
        return {
          ensureExtentContainsCurrentBeacon: function(beacon) {
            console.log('AAAAAAAAFDHGFSD New Current Beacon: ', beacon);
          }
        }
      }
    ]
  );
