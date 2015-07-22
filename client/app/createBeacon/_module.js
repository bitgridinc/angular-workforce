"use strict";

module.exports =
  angular.module('modules.createBeacon', [
      'ui.router',
      'modules.providers',
      'monospaced.elastic',
      'toaster',
      'ngAnimate' // for toaster
    ]
  );

require('./_stateConfig');
require('./coloredContainerHeightController');
require('./_controller');
require('./mapClickMarkerController');
require('./mouseLocationController');
require('./newBeaconFactory');
require('./recipientService');
