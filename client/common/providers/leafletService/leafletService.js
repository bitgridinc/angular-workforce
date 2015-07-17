"use strict";

function LeafletService($window, leafletData) {
  this._leaflet = $window.L;
  this._leafletData = leafletData;

  if (angular.isUndefined(this._leaflet)) {
    throw new Error('leaflet is not defined as window.L', $window);
  } else if (angular.isUndefined(this._leaflet.esri)) {
    throw new Error('esri-leaflet is not defined as window.L.esri', $window);
  }

  var _this = this;
  return {
    createIcon: _this.createIcon.bind(_this),
    createMarker: _this.createMarker.bind(_this),
    onMap: _this.onMap.bind(_this),
    leaflet: _this.leaflet
  }
}

LeafletService.prototype.createIcon = function(params) {
  return this._leaflet.icon(params);
};

LeafletService.prototype.createMarker = function(latlng, params) {
  return this._leaflet.marker(latlng, params);
};

LeafletService.prototype.onMap = function(callback) {
  this._leafletData.getMap('leaflet').then(callback);
};

Object.defineProperty(LeafletService.prototype,
  'leaflet', {
    get: function() {
      return this._leaflet;
    },
    enumerable: false,
    configurable: false
  });

LeafletService.$inject = ['$window', 'leafletData'];

require('./../_module_init.js').service('LeafletService', LeafletService);
