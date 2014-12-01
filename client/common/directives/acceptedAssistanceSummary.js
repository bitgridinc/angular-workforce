"use strict";

var app = require('./_module_init.js');

app.directive('acceptedAssistanceSummary', [function() {
  return {
    restrict: 'E',
    scope: {
      acceptedAssistance: '='
    },
    template: '<div class="panel panel-info">' +
                '{{acceptedAssistance.responderName}} is coming with ' +
                '{{acceptedAssistance.numResponders}} people at ' +
                '{{acceptedAssistance.arrivalDate}}.' +
              '</div>'
  }
}]);