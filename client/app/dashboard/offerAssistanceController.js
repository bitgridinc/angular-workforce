"use strict";

var app = require('./_module_init.js');

app.controller('OfferAssistanceController', function($scope, UserSelectionService) {
  // For debugging purposes
  $scope.name = 'OfferAssistanceController';

  $scope.userSelectionService = UserSelectionService;

  $scope.assistForm = {};
  $scope.assistForm.responderName = "Helper";
  $scope.assistForm.numResponders = 2;

  $scope.assistForm.offerAssistance = function() {
    console.log("You've accepted! $scope:", $scope);
    angular.extend($scope.userSelectionService.currentlySelectedBeacon, {
      responderName: $scope.assistForm.responderName,
      numResponders: $scope.assistForm.numResponders
    });
  };
  $scope.assistForm.declineAssistance = function() {
    console.log("You've declined! $scope:", $scope);
  };
});