"use strict";

var app = require('./_module_init.js');

app.directive('beaconSummary', [function() {
  return {
    // Restricted to only look for this directive in elements
    restrict: 'E',
    templateUrl: '/templates/directives/beaconSummary.tpl.html',
    scope: {
      // TODO: I know it has to do with binding, but what exactly does the '=' do?
      beacon: '=',
      onSelectBeacon: '=',
      onReviewAssistance: '='
    }
  }
}]);