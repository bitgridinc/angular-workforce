"use strict";

module.exports =
  angular.module('modules.listBeacons', [
      'ui.router'
    ]
  );

require('./_stateConfig');
require('./beaconVisibilityService');
require('./listBeaconsController');
