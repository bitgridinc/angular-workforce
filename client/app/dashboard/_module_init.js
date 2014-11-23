"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/angular-route/angular-route.js');
require('../../bower_components/ngDialog/js/ngDialog.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');

require('../../common/services/beaconDetailsFromSummaryService.js');
require('../../common/services/beaconService.js');

require('../leaflet/_module_init.js');
require('../cascadingCollapse/_module_init.js');

module.exports = angular.module('modules.dashboard', [
  'ngRoute',
  'ngDialog',
  'ui.bootstrap',
  'services.beacon',
  'modules.cascadingCollapse',
  'modules.leaflet']);

require('./routeConfiguration.js');
require('./beaconSummaryController.js');
require('./dashboardController.js');