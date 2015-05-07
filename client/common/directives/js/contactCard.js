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
            $scope.$watch('organizationId', function(newVal) {
              if (angular.isDefined(newVal)) {
                $scope.organization = $rootScope.findOrganizationById(newVal);
              }
            });
          }
        ]
      }
    }
  );
