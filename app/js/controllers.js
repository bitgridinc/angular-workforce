"use strict";

angular.module('app.controllers', []).
  controller('requestController', function($scope, $location, beaconService) {
    $scope.form = {};
    $scope.form.org = "BitGrid";
    $scope.form.lat = "1";
    $scope.form.lon = "2";

    $scope.form.submitForm = function(item, event) {
      beaconService.create(item);
      $location.path('/respond');
    };
  })
  .controller('respondController', function($scope) {
    $scope.assistForm = {};
    $scope.assistForm.people = 1;

    $scope.assistForm.offerAssistance = function(beacon) {
      alert("You've accepted!");
    };
    $scope.assistForm.declineAssistance = function(beacon) {
      alert("You've declined!");
    };
  });
