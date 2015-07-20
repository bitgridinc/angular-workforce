"use strict";

module.exports = angular.module('modules.providers', []);

require('./fluentSharedLibrariesService/fluentSharedLibrariesService.js');
require('./geocoderService/geocoderService.js');
require('./leafletService/leafletService.js');
require('./lodashConstant/lodashConstant.js');
require('./messagePacketizerService/messagePacketizerService.js');
require('./restService/restService.js');
require('./socketFactory/socketFactory.js');
require('./navigationService/navigationService.js');
require('./usngService/usngService.js');
