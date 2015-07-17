"use strict";

function LeafletService($window, leafletData) {
  this._leaflet = $window.L;

  if (angular.isUndefined(this._leaflet)) {
    throw new Error('leaflet is not defined as window.L', $window);
  } else if (angular.isUndefined(this._leaflet.esri)) {
    throw new Error('esri-leaflet is not defined as window.L.esri', $window);
  }

  var _this = this;
  return {
    createIcon: function(params) {
      return _this._leaflet.icon(params);
    },
    createMarker: function(latlng, params) {
      return _this._leaflet.marker(latlng, params);
    },
    onMap: function(callback) {
      leafletData.getMap('leaflet').then(callback);
    },
    leaflet: this.leafletGetter
  }
}

// TODO: Learn why this is superior
Object.defineProperty(LeafletService.prototype,
  'leafletGetter', {
    get: function() {
      return this._leaflet;
    },
    enumerable: false,
    configurable: false
  });

LeafletService.$inject = ['$window', 'leafletData'];

require('./../_module_init.js').service('LeafletService', LeafletService);
