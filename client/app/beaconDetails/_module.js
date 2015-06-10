"use strict";

module.exports =
  angular.module('modules.beaconDetails', [
      'ui.router',
      'modules.providers'
    ]
  );

require('./_stateConfig');
require('./_controller');
