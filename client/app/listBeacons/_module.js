"use strict";

module.exports =
  angular.module('modules.listBeacons', [
      'ui.router'
    ]
  );

require('./_stateConfig');
require('./_controller');
require('./requiresInputFilter');
