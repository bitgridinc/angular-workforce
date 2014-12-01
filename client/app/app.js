"use strict";

require('../bower_components/angular/angular.js');
require('../bower_components/angular-route/angular-route.js');

require('../common/directives/_module_init.js');
require('../common/services/_module_init.js');

require('./dashboard/_module_init.js');

var app = angular.module('app', [
  'ngRoute',
  'modules.directives',
  'modules.services',
  'modules.dashboard']);

// TODO: Test this
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({ redirectTo: '/dashboard' });
  $locationProvider.html5Mode(true);
}]);