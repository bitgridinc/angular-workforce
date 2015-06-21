"use strict";

module.exports =
  angular.module('modules.header', [
      'ui.router',
      'angular-jwt'
    ]
  );

require('./_controller');
