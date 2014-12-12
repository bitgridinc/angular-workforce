"use strict";

var app = angular.module('modules.service', []);

app.controller('ServiceController', function($scope) {
  console.log($scope);
  $scope.service = $scope.$parent.service;
});
