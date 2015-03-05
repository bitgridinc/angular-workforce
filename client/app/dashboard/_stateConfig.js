"use strict";

require('./_module')
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
