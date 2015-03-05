"use strict";

require('../beaconControl/_module.js');
require('../header/_module.js');
require('../map/_module.js');

module.exports =
  angular.module('modules.dashboard', [
      'modules.beaconControl',
      'modules.header',
      'modules.map'
    ]
  );

require('./_stateConfig');
