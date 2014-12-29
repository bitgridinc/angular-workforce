"use strict";

require('../../bower_components/angular/angular.js');

module.exports = angular.module('modules.providers', []);

require('./authenticationService.js');
require('./dashboardUiState.js');
require('./messageSendingService.js');
require('./paginationControlFactory.js');
require('./partnerSelectionService.js');
require('./socketFactory.js');