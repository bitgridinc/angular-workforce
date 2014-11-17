"use strict";

require('../bower_components/angular/angular.js');
require('./controllers.js');

var app = angular.module('app', ['ngRoute', 'app.controllers', 'leaflet-directive']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/map.html',
      controller: 'mapController'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);