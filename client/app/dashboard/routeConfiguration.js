"use strict";

var app = require('./_module_init.js');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'templates/dashboard.html',
    controller: 'DashboardController'
  });
}]);