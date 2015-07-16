"use strict";

// TODO: Test this!
var MapClickMarkerController = function($scope, $window, leafletData) {
  var _this = this
    , newBeaconIcon = L.icon({ // Create the utility HQ icon once
        iconUrl: '/images/plus.png',
        iconSize: [32, 32]
      });

  _this.createMarker = function(latlng) {
    return $window.L.marker(latlng, {
      icon: newBeaconIcon
    });
  };

  leafletData.getMap('leaflet').then(function(map) {
    var handler = _this.onClick.bind(_this, map);

    map.on('click', handler);

    $scope.$on('$destroy', function() {
      map.off('click', handler);
      map.removeLayer(_this.clickMarker);
    });
  });
};

MapClickMarkerController.prototype.onClick = function(map, args) {
  if (this.clickMarker) {
    this.clickMarker.setLatLng(args.latlng);
  } else {
    this.clickMarker = this.createMarker(args.latlng);
    this.clickMarker.addTo(map);
  }
};

MapClickMarkerController.$inject = ['$scope', '$window', 'leafletData'];

require('./_module').controller('MapClickMarkerController', MapClickMarkerController);
