"use strict";

require('../../common/directives/_module_init');
require('../../common/providers/_module_init');

require('../dashboard/_module');
require('../login/_module');

module.exports =
  angular.module('app', [
      'ui.bootstrap', // We're using the pagination control
      'ui.router',
      'modules.directives',
      'modules.providers',
      'modules.dashboard',
      'modules.login',
      'mgcrea.ngStrap' // Used by dateTimePicker directive
    ]
  );

require('./_run');
require('./_stateConfig');
require('./_controller');
