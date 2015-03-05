"use strict";

require('../beaconControl/_module');
require('../header/_module');
require('../map/_module');

module.exports =
  angular.module('modules.dashboard', [
      'modules.beaconControl',
      'modules.header',
      'modules.map'
    ]
  );

require('./_stateConfig');
