"use strict";

var _ = require('../../bower_components/lodash/dist/lodash.js');

angular
  .module('modules.beaconDetails', [
      'ui.router',
      'modules.providers'
    ]
  )
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
            onEnter: function($rootScope, $stateParams) {
              console.log("Entering dashboard.mycompany.detail", $stateParams);

              // TODO: Enable selecting current beacon by id
              $rootScope.currentBeaconId = $stateParams.id;

              // TODO: This could make the dependency of SelectionService being instantiated more clear
              //SelectionService.watchId($stateParams);
            },
            onExit: function($rootScope) {
              console.log("Exiting dashboard.mycompany.detail");
              $rootScope.currentBeaconId = undefined;
            }
          });
      }
    ]
  )
  .controller('BeaconDetailsController',
    [         '$scope', '$rootScope', '$state', '$stateParams', 'SelectionService',
      function($scope,   $rootScope,   $state,   $stateParams,   SelectionService) {
        $scope.id = $stateParams.id;
        $scope.selectionState = $rootScope.selectionState;
        //$scope.SelectionService = SelectionService;

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
  )
  .service('SelectionService',
    [         '$rootScope',
      function($rootScope) {

        $rootScope.selectionState = {
          currentBeacon: undefined
        };

        function findById(id) {
          console.log('FindById', id, $rootScope.socketState.beacons);
          return _.find($rootScope.socketState.beacons, function(beacon) {
            return beacon.id === id;
          });
        }

        console.log('SelectionService instantiated');
        $rootScope.$watch(function() { return $rootScope.currentBeaconId },
          function(newValue, oldValue) {
            $rootScope.test = {};
            console.log('currentBeaconId watch called:', newValue, oldValue, $rootScope.selectionState.currentBeacon);
            if (newValue !== undefined) {
              $rootScope.selectionState.currentBeacon = findById(newValue);
            }
            console.log('currentBeaconId watch exiting:', $rootScope.selectionState.currentBeacon);
          }, true);

        $rootScope.$watchCollection(function() { return $rootScope.socketState.beacons },
          function(newValue, oldValue) {
            console.log('socketState.beacons watch called:', newValue, oldValue);
            if ($rootScope.currentBeaconId !== undefined) {
              $rootScope.selectionState.currentBeacon = findById($rootScope.currentBeaconId);
            }
            console.log('socketState.beacons watch exiting:', $rootScope.selectionState.currentBeacon);
          });
      }
    ]
  );
