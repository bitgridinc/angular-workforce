"use strict";

require('./../_module_init.js')
  .directive('organizationCard',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/organizationCard.tpl.html',
        scope: {
          iconUrl: '@',
          organizationId: '='
        },
        controller: [
                  '$rootScope', '$scope',
          function($rootScope,   $scope) {
            var cleanup;
            cleanup = $scope.$watch('organizationId', function(newVal) {
              if (angular.isDefined(newVal)) {
                $scope.organization = $rootScope.findOrganizationById(newVal);
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
