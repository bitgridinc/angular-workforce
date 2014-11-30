"use strict";

var app = require('./_module_init.js');

app.controller('DashboardController', function($scope, DashboardUiState) {

  $scope.dashboardUiState = DashboardUiState;
});