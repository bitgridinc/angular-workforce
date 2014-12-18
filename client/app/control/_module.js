"use strict";

require('../beaconDetails/_module.js');
require('../createBeacon/_module.js');
require('../listBeacons/_module.js');
require('../offerAssistance/_module.js');
require('../reviewAssistance/_module.js');

angular
  .module('modules.control', [
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
        $stateProvider.state('dashboard.mycompany', {
          abstract: true,
          name: 'dashboard.mycompany',
          parent: 'dashboard',
          url: '/mycompany',
          templateUrl: 'templates/control/view.tpl.html'
        });
      }
    ]
  );
