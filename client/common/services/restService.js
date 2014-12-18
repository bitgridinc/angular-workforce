"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');

require('./_module_init.js')
  .service('RestService',
    [         '$rootScope',
      function($rootScope) {
        var idCounter = 0;

        var service = {
          // Beacon being here is a result of our not having a backend. I tried to find a better place. It can't be done.
          beacons: [],
          getBeacon: function(id) {
            return _.find(this.beacons, function(beacon) {
              return beacon.id === id;
            });
          },
          createBeacon: function(beaconData) {
            var newBeacon = angular.copy(beaconData);
            newBeacon.id = idCounter++;
            newBeacon.responses = [];
            newBeacon.acceptedAssistance = undefined;
            // TODO: Add test for this line after I refactor the tests.
            newBeacon.organization = $rootScope.organization;
            this.beacons.push(newBeacon);
          },
          offerAssistance: function(beacon, offeredAssistance) {
            var copy = angular.copy(offeredAssistance);
            copy.organization = $rootScope.organization;
            beacon.responses.push(copy);
          },
          acceptAssistance: function(beacon, acceptedAssistance) {
            beacon.acceptedAssistance = angular.copy(acceptedAssistance);
          }
        };

        service.createBeacon({
          title: 'Test Title',
          description: 'Test Description',
          lat: 38.91,
          lng: -77.02
        });

        return service;
      }
    ]
  );