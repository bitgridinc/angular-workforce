"use strict";

require('../bower_components/angular/angular.js');
require('../bower_components/angular-ui-router/release/angular-ui-router.js');

require('../common/directives/_module_init.js');
require('../common/services/_module_init.js');

require('./dashboard/_module_init.js');

var app = angular.module('app', [
  'ui.router',
  'modules.directives',
  'modules.services',
  'modules.dashboard']);

app.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its descendants is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
);

// TODO: Test this
app.config(
  [          '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/dashboard');

      // TODO: This prevents my from directly accessing child pages (e.g., /dashboard/mycompany) and I don't know why
      //$locationProvider.html5Mode(true);
    }
  ]
);
