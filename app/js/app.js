"use strict";

require('./controllers.js');
require('../bower_components/leaflet');
require('../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');

var app = angular.module('app', ['ngRoute', 'app.controllers', 'leaflet-directive']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/map', {templateUrl: 'partials/map.html'})
      .when('/request', {templateUrl: 'partials/request.html', controller: 'requestController'})
      .when('/respond', {templateUrl: 'partials/respond.html', controller: 'respondController'})
      .otherwise({redirectTo: '/request'});
    $locationProvider.html5Mode(true);
  }]);
