"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.detail', {
            name: 'dashboard.beacons.detail',
            parent: 'dashboard.beacons',
            url: '/{id:int}',
            views: {
              'left': {
                templateUrl: 'templates/beaconDetails/view.tpl.html',
                controller: 'BeaconDetailsController'
              }
            }
          });
      }
    ]
  );
