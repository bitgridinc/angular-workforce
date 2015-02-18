"use strict";

angular
  .module('modules.reviewAssistance', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.detail.review', {
            abstract: true,
            name: 'dashboard.beacons.detail.review',
            parent: 'dashboard.beacons.detail',
            url: '/review',
            views: {
              'right-header@dashboard.beacons': {
                templateUrl: 'templates/reviewAssistance/header.tpl.html',
                controller: 'ReviewAssistanceHeaderController'
              }
            }
          })
          .state('dashboard.beacons.detail.review.response', {
            name: 'dashboard.beacons.detail.review.response',
            parent: 'dashboard.beacons.detail.review',
            url: '/{responseId}',
            views: {
              'right-body@dashboard.beacons': {
                templateUrl: 'templates/reviewAssistance/body.tpl.html',
                controller: 'ReviewAssistanceBodyController'
              }
            }
          });
      }
    ]
  )
  .controller('ReviewAssistanceHeaderController',
    [         '$scope', '$rootScope', 'state',
      function($scope,   $rootScope,   state) {
        console.log('Entering ReviewAssistanceHeaderController');

        function initializeScope($scope, items) {
          if (!angular.isArray(items) || items.length <= 0) {
            throw Error('Items must be a populated array.');
          }

          $scope.totalItems = items.length;

          $scope.changePage = function(newPageIndex) {
            state.go('dashboard.beacons.detail.review.response', { responseId: items[newPageIndex-1].id })
          };

          $scope.changePage(1);
        }

        // TODO: The if statement must be tested
        $rootScope.$watchCollection('selectionState.currentBeacon.responses', function(newValue) {
          console.log('selectionState.currentBeacon.responses changed', newValue);
          if (angular.isDefined(newValue) && newValue.length > 0) {
            initializeScope($scope, newValue);
          }
        });
      }
    ]
  )
  // TODO: Mock backend so I can AAT this.
  .controller('ReviewAssistanceBodyController',
    [         '_', '$scope', '$rootScope', '$state', '$stateParams', 'MessagePacketizer', 'RestService',
      function(_,   $scope,   $rootScope,   $state,   $stateParams,   MessagePacketizer,   RestService) {
        console.log('Entering ReviewAssistanceBodyController');

        var currentBeacon = $rootScope.findBeaconById($stateParams.id);
        $scope.currentItem = _.find(currentBeacon.responses, function(response) {
          return response.id === $stateParams.responseId;
        });

        $scope.acceptAssistance = function() {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentItem.numResponders);
          var message = MessagePacketizer.packetize($scope.currentItem.id, $scope.selectionState.currentBeacon.id);
          RestService.acceptAssistance(message);
          $state.go('dashboard.beacons.list');
        };
      }
    ]
  );
