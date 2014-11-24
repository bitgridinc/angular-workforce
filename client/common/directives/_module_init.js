"use strict";

require('../../bower_components/angular/angular.js');

require('../services/_module_init.js');

module.exports = angular.module('modules.directives', [
  'modules.services']);

require('./beaconSummary.js');