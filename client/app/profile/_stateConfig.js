"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('profile', {
            name: 'profile',
            url: '/profile',
            templateUrl: 'templates/profile/view.tpl.html',
            controller: 'ProfileController'
          });
      }
    ]
  );
