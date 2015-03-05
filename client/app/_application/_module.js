"use strict";

require('../../bower_components/angular/angular');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls');
require('../../bower_components/angular-strap/dist/angular-strap.min');
require('../../bower_components/angular-strap/dist/angular-strap.tpl.min');
require('../../bower_components/angular-ui-router/release/angular-ui-router');

require('../../common/directives/_module_init');
require('../../common/providers/_module_init');

require('../dashboard/_module');
require('../profile/_module');

module.exports =
  angular.module('app', [
      'ui.bootstrap',
      'ui.router',
      'modules.directives',
      'modules.providers',
      'modules.dashboard',
      'modules.profile',
      'mgcrea.ngStrap'
    ]
  );

require('./_run');
require('./_stateConfig');
require('./appController');
require('./socketHandlerService');
