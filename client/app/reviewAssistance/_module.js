"use strict";

angular
  .module('modules.reviewAssistance', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.mycompany.detail.review', {
            name: 'dashboard.mycompany.detail.review',
            parent: 'dashboard.mycompany.detail',
            url: '/review',
            views: {
              'right@dashboard.mycompany': {
                templateUrl: 'templates/reviewAssistance/view.tpl.html',
                controller: 'ReviewAssistanceController'
              }
            }
          });
      }
    ]
  )
  // TODO: Mock backend so I can AAT this.
  .controller('ReviewAssistanceController',
    [         '$scope', '$state', 'RestService', 'DashboardUiState', 'PaginationControl',
      function($scope,   $state,   RestService,   DashboardUiState,   PaginationControl) {

        if (DashboardUiState.currentlySelectedBeacon.responses.length === 0) {
          $state.go('dashboard.mycompany.detail');
        }

        PaginationControl.initScope($scope, DashboardUiState.currentlySelectedBeacon.responses);

        $scope.acceptAssistance = function () {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentItem.numResponders);
          RestService.acceptAssistance(RestService.beacons[0], $scope.currentItem);
        };
      }
    ]
  );
