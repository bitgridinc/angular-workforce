"use strict";

var app = require('./_module_init.js');

app.controller('OfferAssistanceController', function($scope, DashboardUiState, BeaconService) {
  // For debugging purposes
  $scope.name = 'OfferAssistanceController';

  $scope.dashboardUiState = DashboardUiState;

  $scope.assistanceOffer = {
    responderName: "Macho Diggers",
    numResponders: 2,
    arrivalDate: new Date()
  };

  $scope.open = function($event) {
    console.log("open called.", $event);
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.offerAssistance = function() {
    console.log("You've accepted! $scope:", $scope);
    BeaconService.offerAssistance($scope.dashboardUiState.currentlySelectedBeacon, $scope.assistanceOffer);
  };
  $scope.declineAssistance = function() {
    console.log("You've declined! $scope:", $scope);
  };
});