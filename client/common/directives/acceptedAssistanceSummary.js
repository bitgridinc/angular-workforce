"use strict";

var app = require('./_module_init.js');

app.directive('acceptedAssistanceSummary', [function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/acceptedAssistanceSummary.tpl.html',
    scope: {
      acceptedAssistance: '='
    },
    controller: ['$scope', function($scope) {
      console.log('acceptedAssistance controller called.', $scope);
    }]
  }
}]);