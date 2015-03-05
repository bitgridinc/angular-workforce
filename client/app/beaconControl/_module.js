"use strict";

require('../beaconDetails/_module.js');
require('../createBeacon/_module.js');
require('../listBeacons/_module.js');
require('../offerAssistance/_module.js');
require('../reviewAssistance/_module.js');

module.exports =
  angular.module('modules.beaconControl', [
      'modules.beaconDetails',
      'modules.createBeacon',
      'modules.listBeacons',
      'modules.offerAssistance',
      'modules.reviewAssistance'
    ]
  );

require('./_stateConfig');
require('./beaconControlController');
