"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');

require('./_module_init.js')
  .service('RestService',
    [         '$http', '$q', '$rootScope', 'socket',
      function($http,   $q,   $rootScope,   socket) {
        return {
          // Beacon being here is a result of our not having a backend. I tried to find a better place. It can't be done.
          beacons: [],
          getBeacons: function() {
            var deferred = $q.defer();
            $http.get('/beacons').then(function (ctx) {
              console.log('resolving the getBeacons promise', ctx.data);
              deferred.resolve(ctx.data);
            }, function (ctx) {
              console.log('rejecting the getBeacons promise', ctx.data);
              deferred.reject(ctx.data);
            });
            return deferred.promise;
          },
          createBeacon: function(beaconData) {
            beaconData.organization = $rootScope.requestService.organization;
            socket.emit('send:request', beaconData);
          },
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