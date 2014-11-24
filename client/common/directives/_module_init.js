"use strict";

require('../../bower_components/angular/angular.js');
require('../services/userSelectionService.js');

module.exports = angular.module('modules.directives', [
  'services.userSelection']);

require('./beaconSummary.js');