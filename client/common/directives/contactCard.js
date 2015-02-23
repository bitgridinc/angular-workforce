"use strict";

require('./_module_init.js')
  .directive('contactCard',
    function() {
      return {
        restrict: 'E',
        templateUrl: '/templates/directives/contactCard.tpl.html',
        scope: {
          contact: '='
        }
      }
    }
  );
