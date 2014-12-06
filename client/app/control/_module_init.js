"use strict";

require('../../bower_components/angular/angular.js');

require('../createBeacon/_module.js');

module.exports = angular.module('modules.control', [
  'modules.createBeacon'
]);

require('./beaconSummaryListController.js');
require('./controlController.js');
require('./offerAssistanceController.js');
require('./reviewAssistanceController.js');
require('./selectServicesController.js');
require('./stateConfiguration.js');