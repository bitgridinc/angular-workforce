"use strict";

var app = require('./_module_init.js');

app.controller('DashboardController', function($scope, UserSelectionService, DashboardUiState) {

  $scope.dashboardUiState = DashboardUiState;

  // TODO: Remove this by exposing it through ReviewAssistance controller
  $scope.userSelectionService = UserSelectionService;
});

app.controller('respondController', function($scope) {
  $scope.assistForm = {};
  $scope.assistForm.responderName = "Helper";
  $scope.assistForm.numResponders = 2;

  $scope.assistForm.offerAssistance = function() {
    console.log("You've accepted! $scope:", $scope);
    angular.extend($scope.ngDialogData, {
      responderName: $scope.assistForm.responderName,
      numResponders: $scope.assistForm.numResponders
    });
  };
  $scope.assistForm.declineAssistance = function() {
    console.log("You've declined! $scope:", $scope);
  };
});