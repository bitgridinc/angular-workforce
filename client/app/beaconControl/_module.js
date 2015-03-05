"use strict";

require('../beaconDetails/_module');
require('../createBeacon/_module');
require('../listBeacons/_module');
require('../offerAssistance/_module');
require('../reviewAssistance/_module');

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
