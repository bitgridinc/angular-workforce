"use strict";

require('./../_module_init.js')
  .directive('openReviewAssistanceButton',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/openReviewAssistanceButton.tpl.html',
        scope: {
          beacon: '='
        },
        controller: [
                  '$scope', '$state', 'StateService',
          function($scope,   $state,   StateService) {
            $scope.onReviewAssistance = function(beacon) {
              if ($state.includes('dashboard.beacons.detail.review')) {
                StateService.go('dashboard.beacons.detail');
              } else {
                StateService.go('dashboard.beacons.detail.review.response', { id: beacon.id, responseId: beacon.responses[0].id });
              }
            };
          }
        ]
      }
    }
  );
