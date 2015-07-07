"use strict";

module.exports =
  angular.module('modules.createBeacon', [
      'ui.router',
      'modules.providers',
      'monospaced.elastic'
    ]
  );

require('./_stateConfig');
require('./coloredContainerHeightController');
require('./_controller');
require('./mouseLocationController');
require('./newBeaconFactory');
