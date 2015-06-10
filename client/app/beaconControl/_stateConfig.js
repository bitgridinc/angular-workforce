"use strict";

require('./_module')
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
            templateUrl: 'templates/beaconControl/expandableControl.tpl.html'
          });
      }
    ]
  );
