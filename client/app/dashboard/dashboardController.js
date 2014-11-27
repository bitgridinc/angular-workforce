"use strict";

var app = require('./_module_init.js');

app.controller('DashboardController', function($scope, UserSelectionService, DashboardUiState) {

  $scope.dashboardUiState = DashboardUiState;

  // TODO: Remove this by exposing it through ReviewAssistance controller
  $scope.userSelectionService = UserSelectionService;
});