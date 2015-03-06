"use strict";

require('./../_module_init.js')
  .directive('entityCard',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/entityCard.tpl.html',
        scope: {
          iconUrl: '@',
          entityId: '='
        },
        controller: [
                  '$rootScope', '$scope',
          function($rootScope,   $scope) {
            $scope.$watch('entityId', function(newVal) {
              if (angular.isDefined(newVal)) {
                $scope.entity = $rootScope.findEntityById(newVal);
              }
            });
          }
        ]
      }
    }
  );
