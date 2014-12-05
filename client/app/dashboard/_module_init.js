"use strict";

require('../../bower_components/angular/angular.js');

require('../control/_module_init.js');
require('../leaflet/_module_init.js');

module.exports = angular.module('modules.dashboard', [
  'modules.control',
  'modules.leaflet'
]);

require('./stateConfiguration.js');
require('./dashboardController.js');