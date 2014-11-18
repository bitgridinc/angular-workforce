"use strict";

require('../bower_components/angular/angular.js');
require('./dashboard/dashboard.js');

var app = angular.module('app', [
  'ngRoute',
  'dashboard',
  'leaflet-directive']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/dashboard.html',
      controller: 'dashboardCtrl'
    });
  $locationProvider.html5Mode(true);
}]);