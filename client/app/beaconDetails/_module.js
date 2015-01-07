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
          console.log('The number of beacons changed', newVal, oldVal);
          $rootScope.selectionState.currentBeacon = _.find($rootScope.socketState.beacons, function(beacon) {
            return beacon.id === $rootScope.currentlySelectedBeaconId;
          });
        });

        $scope.goToBeaconList = function() { $state.go('dashboard.mycompany.list'); };
        $scope.goToOfferAssistance = function() { $state.go('dashboard.mycompany.detail.assist'); };
        $scope.goToReviewAssistance = function() { $state.go('dashboard.mycompany.detail.review'); };
      }
    ]
  );
