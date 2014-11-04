"use strict";

angular.module('app.controllers', []).
  controller('requestController', function ($scope, $location) {
    $scope.form = {};
    $scope.form.org = "BitGrid";
    $scope.form.lat = "1";
    $scope.form.lon = "2";

    $scope.form.submitForm = function(item, event) {
      $location.path('/respond');
    };
  });
