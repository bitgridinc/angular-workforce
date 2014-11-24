"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/leaflet/dist/leaflet-src');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');

require('../../common/services/_module_init.js');

module.exports = angular.module('modules.leaflet', [
  'leaflet-directive',
  'modules.services']);

require('./leafletController.js');