"use strict";

require('./_module_init.js')
  .directive('openReviewAssistanceButton',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/openReviewAssistanceButton.tpl.html',
        scope: {
          beacon: '='
        },
        controller: function($scope, $state, state) {
          $scope.onReviewAssistance = function(beacon) {
            if ($state.includes('dashboard.beacons.detail.review')) {
              state.go('dashboard.beacons.detail');
            } else {
              state.go('dashboard.beacons.detail.review.response', { id: beacon.id, responseId: beacon.responses[0].id });
            }
          };
        }
      }
    }
  );
