"use strict";

require('./_module')
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
  );
