"use strict";

var mapLocators = function() {
  this.loadedTile = by.className('leaflet-tile-loaded');
  this.marker = by.className('leaflet-marker-icon');
};

module.exports = mapLocators;
