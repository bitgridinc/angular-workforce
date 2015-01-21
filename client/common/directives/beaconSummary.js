"use strict";

require('./_module_init.js')
  .directive('beaconSummary',
    function() {
      return {
        // Restricted to only look for this directive in elements
        restrict: 'E',
        templateUrl: '/templates/directives/beaconSummary.tpl.html',
        scope: {
          beacon: '=',
          onSelectBeacon: '=',
          onReviewAssistance: '='
        }
      }
    }
  );
