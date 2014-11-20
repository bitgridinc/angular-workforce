"use strict";

require('../../bower_components/leaflet');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');

angular.module('dashboard.map', [
  'leaflet-directive'])

  .controller('MapCtrl', function($scope) {
    angular.extend($scope, {
      defaults: {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        zoomControl: false
      },
      center: {
        lat: 38.914268,
        lng: -77.021098,
        zoom: 13
      }
    });
  });