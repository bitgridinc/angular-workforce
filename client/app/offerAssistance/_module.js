"use strict";

var app = angular.module('modules.offerAssistance', []);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('dashboard.mycompany.detail.assist', {
      name: 'dashboard.mycompany.detail.assist',
      parent: 'dashboard.mycompany.detail',
      url: '/assist',
      views: {
        // TODO: Figure out why I have to use the absolute path (@dashboard.mycompany) here
        'right@dashboard.mycompany': { templateUrl: 'templates/offerAssistance/view.tpl.html' }
      }
    })
}]);

app.controller('OfferAssistanceController', function($scope, $state, DashboardUiState, RestService) {
  // For debugging purposes
  $scope.name = 'OfferAssistanceController';

  $scope.dashboardUiState = DashboardUiState;

  $scope.assistanceOffer = {
    responderName: "Macho Diggers",
    numResponders: 2,
    arrivalDate: new Date()
  };

  $scope.open = function($event) {
    console.log("open called.", $event);
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.respond = function(assist) {
    console.log("You've responded to a beacon with", assist);
    if (assist) {
      RestService.offerAssistance($scope.dashboardUiState.currentlySelectedBeacon, $scope.assistanceOffer);
    }
    $state.go('^');
  };
});
