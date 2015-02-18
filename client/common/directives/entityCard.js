"use strict";

require('./_module_init.js')
  .directive('entityCard',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/entityCard.tpl.html',
        scope: {
          iconUrl: '@',
          entityId: '='
        },
        controller: function($rootScope, $scope) {
          $scope.$watch('entityId', function(newVal) {
            if (angular.isDefined(newVal)) {
              $scope.entity = $rootScope.findEntityById(newVal);
            }
          });
        }
      }
    }
  );
