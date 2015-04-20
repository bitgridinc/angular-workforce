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
                  '$scope', 'UserNavigationService',
          function($scope,   UserNavigationService) {
            $scope.onReviewAssistance = function(beacon) {
              if (UserNavigationService.doesUserNavigationStateInclude('dashboard.beacons.detail.review')) {
                UserNavigationService.navigateTo('dashboard.beacons.detail');
              } else {
                UserNavigationService.navigateTo('dashboard.beacons.detail.review.response', { id: beacon.id, responseId: beacon.responses[0].id });
              }
            };
          }
        ]
      }
    }
  );
