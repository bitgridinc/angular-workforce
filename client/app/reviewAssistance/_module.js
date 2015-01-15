"use strict";

angular
  .module('modules.reviewAssistance', [])
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.detail.review', {
            name: 'dashboard.beacons.detail.review',
            parent: 'dashboard.beacons.detail',
            url: '/review',
            views: {
              'right@dashboard.beacons': {
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
    [         '$scope', '$rootScope', '$state', 'MessageSender', 'PaginationControl',
      function($scope,   $rootScope,   $state,   MessageSender,   PaginationControl) {
        console.log('Entering ReviewAssistanceController');

        // These need to be defined for closeablePanel
        $scope.bodyTemplateUrl = 'templates/reviewAssistance/body.tpl.html';
        $scope.headerTemplateUrl = 'templates/reviewAssistance/header.tpl.html';

        // TODO: The if statement must be tested
        $rootScope.$watchCollection('selectionState.currentBeacon.responses', function(newValue) {
          console.log('selectionState.currentBeacon.responses changed', newValue);
          if (angular.isDefined(newValue) && newValue.length > 0) {
            PaginationControl.initScope($scope, newValue);
          }
        });

        $scope.acceptAssistance = function () {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentItem.numResponders);
          // TODO: Implement treeId
          MessageSender.send($scope.currentItem, undefined, undefined);
        };
      }
    ]
  );
