"use strict";

var app = require('./_module_init.js');

// TODO: Add unit testing
app.controller('ReviewAssistanceController', function($scope, RestService) {
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

  $scope.acceptAssistance = function () {
    // TODO: This is garbage :P
    console.log("Offering this many people to help: ", $scope.currentItem.numResponders);
    RestService.acceptAssistance(RestService.beacons[0], $scope.currentItem);
  };
});