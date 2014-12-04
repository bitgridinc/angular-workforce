"use strict";

var app = require('./_module_init.js');

app.controller('DashboardController', function($scope, $state, DashboardUiState) {

  $scope.dashboardUiState = DashboardUiState;

  $scope.onMyCompanyClicked = function () {
    DashboardUiState.isMyCompanyButtonToggled = !DashboardUiState.isMyCompanyButtonToggled;
    if (DashboardUiState.isMyCompanyButtonToggled) {
      $state.go('.mycompany');
    } else {
      $state.go('^');
    }
  };
});