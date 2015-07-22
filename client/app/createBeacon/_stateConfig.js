"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.create', {
            name: 'dashboard.beacons.create',
            parent: 'dashboard.beacons',
            url: '/create',
            views: {
              'left': {
                templateUrl: 'templates/createBeacon/_view.tpl.html',
                controller: 'CreateBeaconController',
                controllerAs: 'createBeaconCtrl'
              }
            }
          });
      }
    ]
  );
