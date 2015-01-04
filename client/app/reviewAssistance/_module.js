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
    [         '$scope', '$state', 'MessageSender', 'PaginationControl',
      function($scope,   $state,   MessageSender,   PaginationControl) {
        console.log('Entering ReviewAssistanceController');

        // TODO: Pass responded instead of the empty array
        PaginationControl.initScope($scope, []);

        $scope.acceptAssistance = function () {
          // TODO: This is garbage :P
          console.log("Offering this many people to help: ", $scope.currentItem.numResponders);
          // TODO: Implement treeId
          MessageSender.send($scope.currentItem, undefined, undefined);
        };
      }
    ]
  );
