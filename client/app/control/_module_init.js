"use strict";

require('../../bower_components/angular/angular.js');

require('../createBeacon/_module.js');
require('../listBeacons/_module.js');

module.exports = angular.module('modules.control', [
  'modules.createBeacon',
  'modules.listBeacons'
]);

require('./controlController.js');
require('./offerAssistanceController.js');
require('./reviewAssistanceController.js');
require('./selectServicesController.js');
require('./stateConfiguration.js');