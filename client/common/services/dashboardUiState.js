"use strict";

var app = require('./_module_init.js');

app.service('DashboardUiState', function() {
  return {
    isMyCompanyButtonToggled: true,
    isCreatingBeacon: true
  }
});