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

// TODO: Test this
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/dashboard');

  $locationProvider.html5Mode(true);
}]);