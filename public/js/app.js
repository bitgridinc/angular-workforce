"use strict";

var app = angular.module('app', ['ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/request', {templateUrl: 'partials/request.html'})
      .when('/respond', {templateUrl: 'partials/respond.html'})
      .otherwise({redirectTo: '/request'});
    $locationProvider.html5Mode(true);
  }]);


