"use strict";

var app = require('./_module_init.js');

app.directive('beaconSummary', [function() {
  return {
    // Restricted to only look for this directive in elements
    restrict: 'E',
    templateUrl: '/templates/directives/beaconSummary.tpl.html',
    scope: {
      // TODO: I know it has to do with binding, but what exactly does the '=' do?
      beacon: '='
    },
    controller: ['$scope', 'DashboardUiState', function($scope, DashboardUiState) {
      console.log('controller called.', $scope, DashboardUiState);
      angular.extend($scope, {
        onSelectBeacon: function () {
          console.log("onSelectBeacon called.", $scope);
          // TODO: How to test when this method fails (e.g., when the name changes)?
          DashboardUiState.toggleBeaconSelection($scope.beacon);
        },
        onReviewOffers: function() {
          console.log("onReviewOffers called.", $scope);
          DashboardUiState.isReviewingOfferOfAssistance = true;
        }
      })
    }]
  }
}]);