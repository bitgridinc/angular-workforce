"use strict";

require('../../common/generated/constants.js');

module.exports =
  angular.module('modules.login', [
      'ui.router',
      'modules.generated'
    ]
  );

require('./_stateConfig');
require('./_controller');
