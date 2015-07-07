"use strict";

require('./../_module_init.js')
  .directive('llToUsng',
    function() {
      return {
        restrict: 'E',
        template: '{{usng}}',
        scope: {
          lat: '=',
          lng: '='
        },
        controller: [
                  '$scope', 'UsngService',
          function($scope,   UsngService) {
            var cleanup;
            cleanup = $scope.$watch('lat || lng', function(newVal) {
              if (angular.isDefined(newVal)) {
                $scope.usng = UsngService.LLtoUSNG($scope.lat, $scope.lng);
              }
            });
            $scope.$on('$destroy', function() {
              cleanup();
            });
          }
        ]
      }
    }
  );
