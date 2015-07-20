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
          var allOrganizations = $rootScope.dataFromServer.allOrganizations;
          console.log('Finding organization by id: ', id, allOrganizations);
          return _.find(allOrganizations, function(organization) {
            return organization.id === id;
          });
        };

        $rootScope.findBeaconById = function(id) {
          var allBeacons = $rootScope.dataFromServer.beacons;
          console.log('Finding beacon by id: ', id, allBeacons);
          return _.find(allBeacons, function(beacon) {
            return beacon.id === id;
          });
        };
      }
    ]
  );
