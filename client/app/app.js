"use strict";

require('../bower_components/angular/angular.js');
require('../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');
require('../bower_components/angular-ui-router/release/angular-ui-router.js');

require('../common/directives/_module_init.js');
require('../common/services/_module_init.js');

require('./dashboard/_module.js');
require('./profile/_module.js');

var app = angular.module('app', [
  'ui.bootstrap',
  'ui.router',
  'modules.directives',
  'modules.services',
  'modules.dashboard',
  'modules.profile']);

// TODO: Be explicit everywhere
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
  [         '$urlRouterProvider',
    function($urlRouterProvider) {
      $urlRouterProvider.otherwise('/dashboard');

      // Normally, the '#' is used to implement routing in the url of a single-page application as changes in the
      // comment don't trigger a page load. HTML5 mode allows for this same routing but native in the browser. There are
      // two problems, though. First, browser support for this isn't consistent. Second, we would need to update the
      // server to serve our application on every possible route within the application (because a user pasting in a
      // copied url shouldn't get a 404). The downside is that we have a '#' in our urls. Big whoop.
      //$locationProvider.html5Mode(true);
    }
  ]
);

// This controller wires up the $rootScope for consumption by the entire application.
app.controller('AppController',
  [         '$rootScope',
    function($rootScope) {
      $rootScope.organization = {
        name: "My Company"
      };
    }
  ]
);