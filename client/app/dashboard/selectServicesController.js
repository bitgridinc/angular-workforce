"use strict";

var app = require('./_module_init.js');

app.controller('SelectServicesController', function($scope, DashboardUiState) {
  $scope.dashboardUiState = DashboardUiState;
});