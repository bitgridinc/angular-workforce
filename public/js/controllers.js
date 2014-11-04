"use strict";

angular.module('app.controllers', []).
  controller('requestController', function ($scope) {
    $scope.form = {};
    $scope.form.org = "BitGrid";
    $scope.form.lat = "1";
    $scope.form.lon = "2";
  });
