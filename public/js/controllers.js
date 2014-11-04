"use strict";

angular.module('app.controllers', []).
  controller('requestController', function ($scope, $location, beaconService) {
    $scope.form = {};
    $scope.form.org = "BitGrid";
    $scope.form.lat = "1";
    $scope.form.lon = "2";

    $scope.form.submitForm = function(item, event) {
      beaconService.create(item);
      $location.path('/respond');
    };
  });
