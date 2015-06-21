"use strict";

module.exports =
  angular.module('modules.login', [
      'ui.router'
    ]
  );

require('./_stateConfig');
require('./_controller');
