"use strict";

require('./../_module_init.js')
  .directive('contactCard',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/contactCard.tpl.html',
        scope: {
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
