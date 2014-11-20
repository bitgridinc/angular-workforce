"use strict";

require('../bower_components/angular/angular.js');
require('./dashboard/dashboard.js');

var app = angular.module('app', [
  'ngRoute',
  'dashboard']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({ redirectTo: '/dashboard' });
  $locationProvider.html5Mode(true);
}]);