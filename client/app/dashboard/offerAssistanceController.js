"use strict";

var app = require('./_module_init.js');

app.controller('OfferAssistanceController', function($scope, DashboardUiState, BeaconService) {
  // For debugging purposes
  $scope.name = 'OfferAssistanceController';

  $scope.dashboardUiState = DashboardUiState;

  $scope.assistanceOffer = {
    responderName: "Helper",
    numResponders: 2
  };

  $scope.offerAssistance = function() {
    console.log("You've accepted! $scope:", $scope);
    BeaconService.offerAssistance($scope.dashboardUiState.currentlySelectedBeacon, $scope.assistanceOffer);
  };
  $scope.declineAssistance = function() {
    console.log("You've declined! $scope:", $scope);
  };
});