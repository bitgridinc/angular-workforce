"use strict";

require('../control/_module_init.js');
require('../map/module.js');

module.exports = angular.module('modules.dashboard', [
  'modules.control',
  'modules.map'
]);

require('./stateConfiguration.js');
require('./dashboardController.js');