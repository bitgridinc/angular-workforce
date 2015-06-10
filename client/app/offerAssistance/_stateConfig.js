"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.detail.assist', {
            name: 'dashboard.beacons.detail.assist',
            parent: 'dashboard.beacons.detail',
            url: '/assist',
            views: {
              // TODO: Why do I have to specify the absolute path only within offerAssistance and reviewAssistance,
              // TODO: which both happen to be grandchildren of dashboard.beacons and are targetting 'right'.
              'right@dashboard.beacons': {
                templateUrl: 'templates/offerAssistance/_view.tpl.html',
                controller: 'OfferAssistanceController'
              }
            }
          });
      }
    ]
  );
