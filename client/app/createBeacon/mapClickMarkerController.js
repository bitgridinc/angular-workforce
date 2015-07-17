"use strict";

// TODO: Test this!
function MapClickMarkerController($scope, LeafletService) {
  var _this = this
    , newBeaconIcon = LeafletService.createIcon({
        iconUrl: '/images/plus.png',
        iconSize: [18, 17]
      });

  _this.createMarker = function(latlng) {
    return LeafletService.createMarker(latlng, {
      icon: newBeaconIcon
    });
  };

  LeafletService.onMap(function(map) {
    var handler = _this.onClick.bind(_this, map);

    map.on('click', handler);

    $scope.$on('$destroy', function() {
      map.off('click', handler);
      map.removeLayer(_this.clickMarker);
    });
  });
}

MapClickMarkerController.prototype.onClick = function(map, args) {
  if (this.clickMarker) {
    this.clickMarker.setLatLng(args.latlng);
  } else {
    this.clickMarker = this.createMarker(args.latlng);
    this.clickMarker.addTo(map);
  }
};

MapClickMarkerController.$inject = ['$scope', 'LeafletService'];

require('./_module').controller('MapClickMarkerController', MapClickMarkerController);
