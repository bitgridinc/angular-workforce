"use strict";

var app = require('./_module_init.js');

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard', {
      name: 'dashboard',
      url: '/dashboard',
      templateUrl: 'templates/dashboard/dashboard.tpl.html',
      controller: 'DashboardController'
    })
    .state('dashboard.mycompany', {
      name: 'dashboard.mycompany',
      parent: 'dashboard',
      url: '/mycompany',
      templateUrl: 'templates/dashboard/createBeacon.tpl.html'
    });
}]);
