"use strict";

require('../bower_components/angular/angular.js');
require('./homePage/homePage.js');

var app = angular.module('app', ['ngRoute', 'app.homePage', 'leaflet-directive']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/homePage.html',
      controller: 'homePageCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);