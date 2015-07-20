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
                  '$scope', 'NavigationService',
          function($scope,   NavigationService) {
            $scope.onReviewAssistance = function(beacon) {
              if (NavigationService.doesNavigationStateInclude('dashboard.beacons.detail.review')) {
                NavigationService.navigateTo('dashboard.beacons.detail');
              } else {
                NavigationService.navigateTo('dashboard.beacons.detail.review.response', { id: beacon.id, responseId: beacon.responses[0].id });
              }
            };
          }
        ]
      }
    }
  );
