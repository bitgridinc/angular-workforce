"use strict";

require('../../bower_components/angular-jwt/dist/angular-jwt');

require('../beaconControl/_module');
require('../header/_module');
require('../map/_module');

module.exports =
  angular.module('modules.dashboard', [
      'modules.beaconControl',
      'modules.header',
      'modules.map',
      'angular-jwt'
    ]
  );

require('./_controller');
require('./_run');
require('./_stateConfig');
require('./jwtHttpInterceptor');
require('./socketHandlerService');
