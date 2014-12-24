"use strict";

require('../../bower_components/angular/angular.js');

module.exports = angular.module('modules.services', []);

require('./authenticationService.js');
require('./dashboardUiState.js');
require('./paginationControlFactory.js');
require('./partnerSelectionFactory.js');
require('./restService.js');
require('./socketFactory.js');