"use strict";

var app = require('./_module_init.js');

app.controller('DashboardController', function($scope, $state) {
  var isMyCompanyButtonToggled = false;
  $scope.toggleMyCompanyButton = function () {
    isMyCompanyButtonToggled = !isMyCompanyButtonToggled;
    $state.go(isMyCompanyButtonToggled ? 'dashboard.mycompany' : '^');
  };
});