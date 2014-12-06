"use strict";

require('../../bower_components/angular/angular.js');
require('../../bower_components/leaflet/dist/leaflet-src');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');

var app = angular.module('modules.map', [
  'leaflet-directive'
]);

app.controller('MapController', function($scope, BeaconService) {
  angular.extend($scope, {
    defaults: {
      tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
      zoomControl: false
    },
    center: {
      lat: 38.914268,
      lng: -77.021098,
      zoom: 13
    },
    markers: BeaconService.beacons
  });
});