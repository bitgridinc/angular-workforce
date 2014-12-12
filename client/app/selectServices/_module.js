"use strict";

require('../service/_module.js');

var app = angular.module('modules.selectServices', [
  'modules.service'
]);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany.detail.services', {
      name: 'dashboard.mycompany.detail.services',
      url: '/services',
      views: {
        'left@dashboard.mycompany': {
          templateUrl: 'templates/selectServices/view.tpl.html',
          controller: 'SelectServicesController'
        }
      }
    });
}]);

app.controller('SelectServicesController', function($scope, DashboardUiState) {
  $scope.dashboardUiState = DashboardUiState;
  $scope.services = [{ type: "laundry", name: undefined, address: undefined }];
});
