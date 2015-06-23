"use strict";

module.exports =
  angular.module('modules.login', [
      'ui.router',
      'modules.providers.constants'
    ]
  );

require('./_stateConfig');
require('./_controller');
