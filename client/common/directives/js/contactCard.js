"use strict";

require('./../_module_init.js')
  .directive('contactCard',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/contactCard.tpl.html',
        scope: {
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
