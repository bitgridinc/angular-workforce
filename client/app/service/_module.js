"use strict";

var app = angular.module('modules.service', []);

app.controller('ServiceController', function($scope) {
  console.log($scope);

  // I'm not a fan of using $parent to get at the ng-repeat in selectServices
  $scope.service = $scope.$parent.service;
});
