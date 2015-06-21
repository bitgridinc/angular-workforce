"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard', {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: 'templates/dashboard/_view.tpl.html',
            controller: 'DashboardController',
            data: {
              // This will be inherited by all nested states
              requiresLogin: true
            }
          });
      }
    ]
  );
