"use strict";

module.exports =
  angular.module('modules.map', [
      'leaflet-directive'
    ]
  );

require('./mapBehaviorController');
require('./mapExtentService');
require('./mapInitializationController');
