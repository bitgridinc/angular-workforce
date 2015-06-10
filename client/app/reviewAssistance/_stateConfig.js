"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.detail.review', {
            name: 'dashboard.beacons.detail.review',
            parent: 'dashboard.beacons.detail',
            url: '/review',
            views: {
              'right@dashboard.beacons': {
                templateUrl: 'templates/reviewAssistance/_view.tpl.html',
                controller: 'ReviewAssistanceController'
              }
            }
          })
          .state('dashboard.beacons.detail.review.response', {
            name: 'dashboard.beacons.detail.review.response',
            parent: 'dashboard.beacons.detail.review',
            url: '/{responseId}',
            views: {
              'page': {
                templateUrl: 'templates/reviewAssistance/body.tpl.html',
                controller: 'BodyController'
              }
            }
          });
      }
    ]
  );
