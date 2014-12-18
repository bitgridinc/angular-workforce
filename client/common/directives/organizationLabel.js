"use strict";

require('./_module_init.js')
  .directive('organizationLabel',
    function() {
      return {
        restrict: 'E',
        scope: {
          organization: '='
        },
        template: '{{organization.name}}'
      }
    }
  );
