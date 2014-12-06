"use strict";

var app = require('./_module_init.js');

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany', {
      abstract: true,
      name: 'dashboard.mycompany',
      parent: 'dashboard',
      url: '/mycompany',
      templateUrl: 'templates/control/control.tpl.html'
    });
}]);
