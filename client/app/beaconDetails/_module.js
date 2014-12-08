"use strict";

var app = angular.module('modules.beaconDetails', []);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany.detail', {
      name: 'dashboard.mycompany.detail',
      parent: 'dashboard.mycompany',
      url: '/detail/:id',
      templateUrl: 'templates/beaconDetails/view.tpl.html',
      controller: function($scope, $stateParams) {
        $scope.id = $stateParams.id;
      }
    })
}]);

app.controller('BeaconDetailsController', function($scope, $state, DashboardUiState, BeaconService) {
  $scope.dashboardUiState = DashboardUiState;

  $scope.beacon = BeaconService.getBeacon(Number($scope.$parent.id));

  $scope.onSelectBeacon = function () {
    $state.go('^.list');
  };
});
