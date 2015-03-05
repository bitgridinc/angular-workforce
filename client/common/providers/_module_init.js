"use strict";

require('../../bower_components/angular/angular');

module.exports = angular.module('modules.providers', []);

require('./authenticationService/authenticationService.js');
require('./fluentSharedLibrariesService/fluentSharedLibrariesService.js');
require('./geocoderService/geocoderService.js');
require('./lodashService/lodashService.js');
require('./messagePacketizerService/messagePacketizerService.js');
require('./restService/restService.js');
require('./socketFactory/socketFactory.js');
require('./stateService/stateService.js');
