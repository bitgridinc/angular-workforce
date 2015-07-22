"use strict";

require('./_module')
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('login', {
            name: 'login',
            url: '/login/{to:string}',
            templateUrl: 'templates/login/_view.tpl.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
          });
      }
    ]
  );
