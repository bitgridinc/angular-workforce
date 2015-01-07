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
              $rootScope.currentlySelectedBeaconId = $stateParams.id;
            },
            onExit: function($rootScope) {
              $rootScope.currentlySelectedBeaconId = undefined;
            }
          });
      }
    ]
  )
  .controller('BeaconDetailsController',
    [         '$scope', '$rootScope', '$state',
      function($scope,   $rootScope,   $state) {
        $rootScope.selectionState = $scope.selectionState = {
          currentBeacon: undefined
        };

        $rootScope.$watch('socketState.beacons.length', function(newVal, oldVal) {
          console.log('Either the number of beacons or the currently selected beacon id changed', newVal, oldVal);
          $rootScope.selectionState.currentBeacon = _.find($rootScope.socketState.beacons, function(beacon) {
            return beacon.id === $rootScope.currentlySelectedBeaconId;
          });
        });

        $scope.onSelectBeacon = function() { $state.go('dashboard.mycompany.list'); };
        $scope.onOfferAssistance = function() { $state.go('dashboard.mycompany.detail.assist'); };
        $scope.onReviewAssistance = function() { $state.go('dashboard.mycompany.detail.review'); };
        $scope.onGoBack = function() { $state.go('dashboard.mycompany.list'); };
      }
    ]
  );
