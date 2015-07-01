"use strict";

module.exports =
  angular.module('modules.map', [
      'leaflet-directive'
    ]
  );

require('./mapController');
require('./mapExtentService');
