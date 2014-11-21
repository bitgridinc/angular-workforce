"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/ngDialog/js/ngDialog.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');
require('../../common/services/beaconService.js');
require('./cascadingCollapse.js');
require('./leafletController.js');

module.exports = angular.module('modules.dashboard', [
  'ngDialog',
  'ui.bootstrap',
  'app.services',
  'dashboard.cascadingCollapse',
  'dashboard.leaflet']);