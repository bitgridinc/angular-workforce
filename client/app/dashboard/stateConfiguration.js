"use strict";

var app = require('./_module_init.js');

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard/dashboard.tpl.html',
      controller: 'DashboardController'
    });
}]);