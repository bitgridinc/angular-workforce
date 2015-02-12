"use strict";

require('../../bower_components/angular/angular.js');
var _ = require('../../bower_components/lodash/dist/lodash.js');

module.exports = angular.module('modules.providers', []);

require('./authenticationService.js');
require('./geocoderService.js');
require('./lodashService.js');
require('./messagePacketizerService.js');
require('./paginationControlFactory.js');
require('./restService.js');
require('./socketFactory.js');
require('./stateService.js');
