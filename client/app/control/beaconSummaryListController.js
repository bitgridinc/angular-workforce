"use strict";

var app = require('./_module_init.js');

app.controller('BeaconSummaryListController', function($scope, $state, DashboardUiState, BeaconService) {
  // For debugging purposes
  $scope.name = 'BeaconSummaryListController';

  $scope.dashboardUiState = DashboardUiState;
  $scope.beacons = BeaconService.beacons;

  // We don't require logic for backing up as the Create Beacon view covers this functionality
  $scope.onCreateBeaconClick = function () {
    $state.go('.create');
  };
});