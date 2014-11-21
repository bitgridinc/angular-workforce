"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/ngDialog/js/ngDialog.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');

require('../../common/services/beaconService.js');

require('../leaflet/_module_init.js');
require('../cascadingCollapse/_module_init.js');

module.exports = angular.module('modules.dashboard', [
  'ngDialog',
  'ui.bootstrap',
  'app.services',
  'modules.cascadingCollapse',
  'modules.leaflet']);

require('./dashboard.js');