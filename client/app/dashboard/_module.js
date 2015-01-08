"use strict";

require('../beaconControl/_module.js');
require('../header/_module.js');
require('../map/_module.js');

angular
  .module('modules.dashboard', [
      'modules.beaconControl',
      'modules.header',
      'modules.map'
    ]
  )
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard', {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: 'templates/dashboard/view.tpl.html'
          });
      }
    ]
  );
