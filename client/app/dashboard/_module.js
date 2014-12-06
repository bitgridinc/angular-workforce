"use strict";

require('../control/_module_init.js');
require('../map/_module.js');

var app = angular.module('modules.dashboard', [
  'modules.control',
  'modules.map'
]);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard', {
      name: 'dashboard',
      url: '/dashboard',
      templateUrl: 'templates/dashboard/view.tpl.html',
      controller: 'DashboardController'
    });
}]);

app.controller('DashboardController', function($scope, $state) {
  var isMyCompanyButtonToggled = false;
  $scope.toggleMyCompanyButton = function () {
    isMyCompanyButtonToggled = !isMyCompanyButtonToggled;
    $state.go(isMyCompanyButtonToggled ? 'dashboard.mycompany' : '^');
  };
});
