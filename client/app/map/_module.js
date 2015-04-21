"use strict";

require('../../bower_components/angular/angular');
//require('../../bower_components/leaflet/dist/leaflet-src');
//require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive');
//require('../../bower_components/angular-esri-map/dist/angular-esri-map');

module.exports =
  angular.module('modules.map', [
      //'leaflet-directive'
      //'esri.map'
    ]
  );

require('./mapController');
require('./mapExtentService');
