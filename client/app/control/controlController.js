"use strict";

var app = require('./_module_init.js');

app.controller('ControlController', function($scope, DashboardUiState) {
  $scope.dashboardUiState = DashboardUiState;
});