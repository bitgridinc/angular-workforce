"use strict";

module.exports =
  angular.module('modules.map', [
      'esri.map'
    ]
  );

require('./mapController');
require('./mapExtentService');
