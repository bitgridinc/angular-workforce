"use strict";

require('./../_module_init.js')
  .directive('navigateTo',
    function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            scope.navigationService.navigateTo(attrs.navigateTo);
          });
        }
      }
    }
  );
