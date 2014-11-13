"use strict";

require('./controllers.js');

var app = angular.module('app', ['ngRoute', 'app.controllers', 'leaflet-directive']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/map', {
      templateUrl: 'partials/map.html',
      controller: 'mapController'
    })
    .when('/respond', {
      templateUrl: 'partials/respond.html',
      controller: 'respondController'
    })
    .otherwise({
      redirectTo: '/request'
    });
  $locationProvider.html5Mode(true);
}]);