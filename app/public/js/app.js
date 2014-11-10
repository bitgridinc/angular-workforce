"use strict";

var app = angular.module('app', ['ngRoute', 'app.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/request', {templateUrl: 'partials/request.html', controller: 'requestController'})
      .when('/respond', {templateUrl: 'partials/respond.html', controller: 'respondController'})
      .otherwise({redirectTo: '/request'});
    $locationProvider.html5Mode(true);
  }]);


