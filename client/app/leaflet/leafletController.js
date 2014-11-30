"use strict";

var app = require('./_module_init.js');

app.controller('LeafletController', function($scope, $rootScope, BeaconService) {
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