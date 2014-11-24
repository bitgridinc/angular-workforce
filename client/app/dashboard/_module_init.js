"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/angular-route/angular-route.js');
require('../../bower_components/ngDialog/js/ngDialog.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');

require('../../common/services/_module_init.js');
require('../../common/directives/_module_init.js');

require('../leaflet/_module_init.js');
require('../cascadingCollapse/_module_init.js');

module.exports = angular.module('modules.dashboard', [
  'ngRoute',
  'ngDialog',
  'ui.bootstrap',
  'modules.services',
  'modules.directives',
  'modules.cascadingCollapse',
  'modules.leaflet']);

require('./routeConfiguration.js');
require('./dashboardController.js');