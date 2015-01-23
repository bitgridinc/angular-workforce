"use strict";

require('../beaconDetails/_module.js');
require('../createBeacon/_module.js');
require('../listBeacons/_module.js');
require('../offerAssistance/_module.js');
require('../reviewAssistance/_module.js');

angular
  .module('modules.beaconControl', [
      'modules.beaconDetails',
      'modules.createBeacon',
      'modules.listBeacons',
      'modules.offerAssistance',
      'modules.reviewAssistance'
    ]
  )
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        // In ui-router, an abstract state can have child states but can not be transitioned to. It is activated
        // implicitly when one of its descendants are activated. TODO: Why am I using it?
        $stateProvider
          .state('dashboard.beacons', {
            abstract: true,
            name: 'dashboard.beacons',
            parent: 'dashboard',
            url: '/beacons',
            templateUrl: 'templates/beaconControl/view2.tpl.html'
          });
      }
    ]
  )
  .controller('BeaconControlController',
    [         '$scope', '$state',
      function($scope,   $state) {
        $scope.toggleMyBeaconsButton = function() {
          if ($state.includes('dashboard.beacons.list')) {
            $state.go('dashboard');
          } else {
            $state.go('dashboard.beacons.list');
          }
        };
      }
    ]
  );
