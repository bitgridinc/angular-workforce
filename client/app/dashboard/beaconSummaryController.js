"use strict";

var app = require('./_module_init.js');

app.controller('BeaconSummaryController', function($scope, UserSelectionService) {
  angular.extend($scope, {
    onClick: function() {
      console.log("onClick called.", $scope);
      // TODO: How to test when this method fails?
      UserSelectionService.toggleBeaconSelection($scope.$parent.$parent.marker);
    }
  })
});
