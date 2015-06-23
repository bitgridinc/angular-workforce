"use strict";

require('../../bower_components/angular/angular');

module.exports = angular.module('modules.providers', []);

require('./fluentSharedLibrariesService/fluentSharedLibrariesService.js');
require('./generated/constants.js');
require('./geocoderService/geocoderService.js');
require('./lodashService/lodashService.js');
require('./messagePacketizerService/messagePacketizerService.js');
require('./restService/restService.js');
require('./socketFactory/socketFactory.js');
require('./userNavigationService/userNavigationService.js');
