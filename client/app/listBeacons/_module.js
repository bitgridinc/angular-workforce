"use strict";

var app = angular.module('modules.listBeacons', []);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany.list', {
      name: 'dashboard.mycompany.list',
      parent: 'dashboard.mycompany',
      url: '',
      templateUrl: 'templates/listBeacons/view.tpl.html'
    })
}]);

app.controller('ListBeaconsController', function($scope, $state, DashboardUiState, BeaconService) {
  // For debugging purposes
  $scope.name = 'ListBeaconsController';

  $scope.dashboardUiState = DashboardUiState;
  $scope.beacons = BeaconService.beacons;

  // We don't require logic for backing up as the Create Beacon view covers this functionality
  $scope.onCreateBeaconClick = function () {
    $state.go('^.create');
  };
});
