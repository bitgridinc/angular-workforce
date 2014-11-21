"use strict";

var app = require('./_module_init.js');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardController'
  });
}]);