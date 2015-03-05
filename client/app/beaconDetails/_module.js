"use strict";

module.exports =
  angular.module('modules.beaconDetails', [
      'ui.router',
      'modules.providers',
      'leaflet-directive'
    ]
  );

require('./_stateConfig');
require('./beaconDetailsController');
