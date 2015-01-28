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
          .state('dashboard.beacons.detail', {
            name: 'dashboard.beacons.detail',
            parent: 'dashboard.beacons',
            url: '/{id:int}',
            views: {
              'left': {
                templateUrl: 'templates/beaconDetails/view.tpl.html',
                controller: 'BeaconDetailsController'
              }
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
            return beacon.id === $rootScope.$stateParams.id;
          });
        });

        $scope.goToBeaconList = function() { $state.go('dashboard.beacons.list'); };
        $scope.goToOfferAssistance = function() { $state.go('dashboard.beacons.detail.assist'); };
        $scope.goToReviewAssistance = function() { $state.go('dashboard.beacons.detail.review'); };
      }
    ]
  );
