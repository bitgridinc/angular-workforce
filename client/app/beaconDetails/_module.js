"use strict";

var app = angular.module('modules.beaconDetails', []);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany.detail', {
      name: 'dashboard.mycompany.detail',
      parent: 'dashboard.mycompany',
      url: '/:id',
      templateUrl: 'templates/beaconDetails/view.tpl.html',
      controller: function($scope, $stateParams) {
        $scope.id = $stateParams.id;
      }
    })
}]);

app.controller('BeaconDetailsController', function($scope, $state, DashboardUiState, BeaconService) {
  $scope.dashboardUiState = DashboardUiState;

  // TODO: Implement getBeacon
  $scope.beacon = BeaconService.getBeacon($scope.id);

  $scope.onSelectBeacon = function () {
    $state.go('^.list');
  };
});
