"use strict";

module.exports =
  angular.module('modules.offerAssistance', [
      'ui.router',
      'modules.providers'
    ]
  );

require('./_controller');
require('./_stateConfig');
require('./assignedUsersController');
require('./buttonController');
