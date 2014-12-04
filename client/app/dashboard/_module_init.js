"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');

require('../leaflet/_module_init.js');

module.exports = angular.module('modules.dashboard', [
  'ui.bootstrap',
  'modules.leaflet'
]);

require('./beaconSummaryListController.js');
require('./createBeaconController.js');
require('./stateConfiguration.js');
require('./offerAssistanceController.js');
require('./reviewAssistanceController.js');
require('./selectServicesController.js');
require('./dashboardController.js');