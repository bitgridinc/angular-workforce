"use strict";

require('./../_module_init.js')
  .directive('navigateTo',
    function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            var params = {};
            if (angular.isDefined(attrs.navigateToBeaconId)) {
              params.id = attrs.navigateToBeaconId;
            }
            scope.navigationService.navigateTo(attrs.navigateTo, params);
          });
        }
      }
    }
  );
