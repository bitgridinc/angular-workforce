"use strict";

var app = require('./_module_init.js');

app.controller('ReviewAssistanceController', function($scope) {
  angular.extend($scope, {
    name: 'ReviewAssistanceController',
    items: [],
    currentItem: undefined,
    totalItems: 0
  });

  $scope.$on('currentBeaconChanged', function (event, currentBeacon) {
    console.log('currentBeaconChanged to: ', currentBeacon, event);
    $scope.items = currentBeacon ? currentBeacon.responses : [];
  });

  $scope.pageChanged = function (newPage) {
    console.log('Page changed to: ', newPage);
    $scope.currentItem = $scope.items[newPage-1];
  };

  $scope.$watch('items.length', function (newValue, oldValue) {
    console.log('$watch:items.length', newValue, oldValue);
    $scope.totalItems = newValue;
    $scope.currentItem = $scope.currentItem || $scope.items[0];
  });
});