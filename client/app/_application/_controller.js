"use strict";

// This controller wires up the $rootScope for consumption by the entire application.
require('./_module')
  .controller('AppController',
    [         '$rootScope', '_',
      function($rootScope,   _) {
        $rootScope.dataFromServer = {
          allOrganizations: [],
          currentOrganization: {},
          beacons: []
        };

        $rootScope.findOrganizationById = function(id) {
          console.log('Finding organization by id: ', id, $rootScope.dataFromServer.allOrganizations);
          return _.find($rootScope.dataFromServer.allOrganizations, function(organization) {
            return organization.id === id;
          });
        };

        $rootScope.findBeaconById = function(id) {
          console.log('Finding beacon by id: ', id, $rootScope.dataFromServer.beacons);
          return _.find($rootScope.dataFromServer.beacons, function(beacon) {
            return beacon.id === id;
          });
        };
      }
    ]
  );
