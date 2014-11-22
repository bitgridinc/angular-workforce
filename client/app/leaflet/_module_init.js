"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/leaflet/dist/leaflet-src');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');

require('../../common/services/beaconService.js');

module.exports = angular.module('modules.leaflet', [
  'leaflet-directive',
  'services.beacon']);

require('./leafletController.js');