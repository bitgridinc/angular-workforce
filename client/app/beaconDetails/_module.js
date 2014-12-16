"use strict";

var app = angular.module('modules.beaconDetails', []);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany.detail', {
      name: 'dashboard.mycompany.detail',
      parent: 'dashboard.mycompany',
      url: '/detail/:id',
      views: {
        'left': {
          templateUrl: 'templates/beaconDetails/view.tpl.html',
          controller: 'BeaconDetailsController'
        }
      },
      onEnter: function(DashboardUiState, RestService, $stateParams) {
        console.log("Entering dashboard.mycompany.detail", $stateParams);

        // TODO: Enable selecting current beacon by id
        DashboardUiState.toggleBeaconSelection(RestService.getBeacon(Number($stateParams.id)));
      },
      onExit: function(DashboardUiState) {
        console.log("Exiting dashboard.mycompany.detail");
        DashboardUiState.toggleBeaconSelection(undefined);
      }
    })
}]);

app.controller('BeaconDetailsController', function($scope, $state, $stateParams, DashboardUiState) {
  $scope.id = $stateParams.id;
  $scope.beacon = DashboardUiState.currentlySelectedBeacon;

  $scope.onSelectBeacon = function () {
    $state.go('dashboard.mycompany.list');
  };

  $scope.onOfferAssistance = function () {
    $state.go('dashboard.mycompany.detail.assist');
  };

  $scope.onReviewAssistance = function () {
    $state.go('dashboard.mycompany.detail.review');
  };
});
