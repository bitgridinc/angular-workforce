"use strict";

var app = require('./_module_init.js');

app.controller('BeaconSummaryController', function($scope) {
  angular.extend($scope, {
    onClick: function() {
      console.log("onClick called.");
    }
  })
});
