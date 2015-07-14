"use strict";

require('./../_module_init.js')
  .directive('toggleEditableContainer',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/templates/toggleEditableContainer.tpl.html',
        transclude: true,
        scope: {
        },
        controller: function($scope) {
          $scope.editable = false;
          $scope.toggleEditable = function() {
            $scope.editable = !$scope.editable;
          };
        },
        link: function(scope, element, attrs) {
        }
      }
    }
  );
