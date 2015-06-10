"use strict";

// TODO: Why do I still need to explicitly reference angular-esri-map in applicationShell.html?
require('../../bower_components/angular-esri-map/dist/angular-esri-map');

module.exports =
  angular.module('modules.map', [
      'esri.map'
    ]
  );

require('./_controller');
require('./mapExtentService');
