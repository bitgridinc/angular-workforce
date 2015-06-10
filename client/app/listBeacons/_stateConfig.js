"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.list', {
            name: 'dashboard.beacons.list',
            parent: 'dashboard.beacons',
            url: '',
            views: {
              'left': {
                templateUrl: 'templates/listBeacons/_view.tpl.html',
                controller: 'ListBeaconsController'
              }
            }
          })
      }
    ]
  );
