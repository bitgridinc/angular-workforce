"use strict";

module.exports =
  angular.module('modules.offerAssistance', [
      'ui.router',
      'modules.providers'
    ]
  );

require('./_stateConfig');
require('./offerAssistanceController');
