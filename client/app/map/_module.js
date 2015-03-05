"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/leaflet/dist/leaflet-src');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');

module.exports =
  angular.module('modules.map', [
      'leaflet-directive'
    ]
  );

require('./mapController');
