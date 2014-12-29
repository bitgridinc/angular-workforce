"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');

require('./_module_init.js')
  .service('RestService',
    [         '$http', '$q', '$rootScope', 'socket',
      function($http,   $q,   $rootScope,   socket) {
        return {
          // Beacon being here is a result of our not having a backend. I tried to find a better place. It can't be done.
          beacons: [],
          offerAssistance: function(beacon, offeredAssistance) {
            var copy = angular.copy(offeredAssistance);
            copy.organization = $rootScope.requestService.organization;
            beacon.responses.push(copy);
          },
          acceptAssistance: function(beacon, acceptedAssistance) {
            beacon.acceptedAssistance = angular.copy(acceptedAssistance);
          }
        };
      }
    ]
  );