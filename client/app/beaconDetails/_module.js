"use strict";

angular
  .module('modules.beaconDetails', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
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
            onEnter: function(DashboardUiState, $rootScope, $stateParams) {
              console.log("Entering dashboard.mycompany.detail", $stateParams);

              // TODO: Enable selecting current beacon by id
              DashboardUiState.toggleBeaconSelection($rootScope.requestService.getBeacon($stateParams.id));
            },
            onExit: function(DashboardUiState) {
              console.log("Exiting dashboard.mycompany.detail");
              DashboardUiState.toggleBeaconSelection(undefined);
            }
          });
      }
    ]
  )
  .controller('BeaconDetailsController',
    [         '$scope', '$state', '$stateParams', 'DashboardUiState',
      function($scope,   $state,   $stateParams,   DashboardUiState) {
        $scope.id = $stateParams.id;
        $scope.beacon = DashboardUiState.currentlySelectedBeacon;

        // TODO: Test as this is very important
        /*if (DashboardUiState.currentlySelectedBeacon === undefined) {
          console.log('Error: currentlySelectedBeacon is undefined, backing up to list view');
          $state.go('dashboard.mycompany.list');
        }*/

        $scope.onSelectBeacon = function () {
          $state.go('dashboard.mycompany.list');
        };

        $scope.onOfferAssistance = function () {
          $state.go('dashboard.mycompany.detail.assist');
        };

        $scope.onReviewAssistance = function () {
          $state.go('dashboard.mycompany.detail.review');
        };

        $scope.onGoBack = function () {
          $state.go('dashboard.mycompany.list');
        };
      }
    ]
  );
