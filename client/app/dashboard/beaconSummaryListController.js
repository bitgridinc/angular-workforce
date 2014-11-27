"use strict";

var app = require('./_module_init.js');

app.controller('BeaconSummaryListController', function($scope, DashboardUiState, BeaconService, UserSelectionService) {
  // For debugging purposes
  $scope.name = 'BeaconSummaryListController';

  $scope.dashboardUiState = DashboardUiState;
  $scope.beacons = BeaconService.beacons;
  $scope.userSelectionService = UserSelectionService;
});