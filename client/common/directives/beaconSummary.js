"use strict";

var app = require('./_module_init.js');

app.directive('beaconSummary', [function() {
  return {
    // TODO: What does restrict mean?
    restrict: 'E',
    templateUrl: '/templates/directives/beaconSummary.html',
    scope: {
      // TODO: I know it has to do with binding, but what exactly does the '=' do?
      beacon: '='
    },
    controller: ['$scope', 'UserSelectionService', function($scope, UserSelectionService) {
      console.log('controller called.', $scope, UserSelectionService);
      angular.extend($scope, {
        onSelectBeacon: function () {
          console.log("onSelectBeacon called.", $scope);
          // TODO: How to test when this method fails (e.g., when the name changes)?
          UserSelectionService.toggleBeaconSelection($scope.beacon);
        }
      })
    }]
  }
}]);