"use strict";

require('./_module')
  .controller('ReviewAssistanceController',
    [         '$scope', '$rootScope',
      function($scope,   $rootScope) {
        console.log('Entering ReviewAssistanceController');

        function initializeScope($scope, items) {
          if (!angular.isArray(items) || items.length <= 0) {
            throw Error('Items must be a populated array.');
          }

          $scope.totalItems = items.length;

          $scope.changePage = function(newPageIndex) {
            $rootScope.userNavigationService.navigateTo('dashboard.beacons.detail.review.response', { responseId: items[newPageIndex-1].id });
          };

          $scope.changePage(1);
        }

        // TODO: The if statement must be tested
        // We store this on the $rootScope so it can be disabled when the user selects to accept a response
        $scope.responsesWatch = $rootScope.$watchCollection('selectionState.currentBeacon.responses', function(newValue) {
          console.log('selectionState.currentBeacon.responses changed', newValue);
          if (angular.isDefined(newValue) && newValue.length > 0) {
            initializeScope($scope, newValue);
          }
        });
      }
    ]
  );
