"use strict";

require('../../bower_components/angular-elastic/elastic.js');

module.exports =
  angular.module('modules.createBeacon', [
      'ui.router',
      'modules.providers',
      'monospaced.elastic'
    ]
  );

require('./_stateConfig');
require('./coloredContainerHeightController');
require('./createBeaconController');
require('./newBeaconFactory');
