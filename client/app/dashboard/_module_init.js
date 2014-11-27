"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/angular-route/angular-route.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');

require('../leaflet/_module_init.js');
require('../cascadingCollapse/_module_init.js');

module.exports = angular.module('modules.dashboard', [
  'ngRoute',
  'ui.bootstrap',
  'modules.cascadingCollapse',
  'modules.leaflet'
]);

require('./beaconSummaryListController.js');
require('./createBeaconController.js');
require('./routeConfiguration.js');
require('./dashboardController.js');