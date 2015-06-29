"use strict";

module.exports =
  angular.module('modules.map', [
      'esri.map'
    ]
  );

require('./_controller');
require('./mapExtentService');
