"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.detail.review', {
            abstract: true,
            name: 'dashboard.beacons.detail.review',
            parent: 'dashboard.beacons.detail',
            url: '/review',
            views: {
              'right-header@dashboard.beacons': {
                templateUrl: 'templates/reviewAssistance/header.tpl.html',
                controller: 'ReviewAssistanceHeaderController'
              }
            }
          })
          .state('dashboard.beacons.detail.review.response', {
            name: 'dashboard.beacons.detail.review.response',
            parent: 'dashboard.beacons.detail.review',
            url: '/{responseId}',
            views: {
              'right-body@dashboard.beacons': {
                templateUrl: 'templates/reviewAssistance/body.tpl.html',
                controller: 'ReviewAssistanceBodyController'
              }
            }
          });
      }
    ]
  );
