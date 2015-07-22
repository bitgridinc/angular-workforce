"use strict";

var MouseLocationController = function($scope, LeafletService, UsngService) {
  function latlngToUSNG(latlng) {
    return UsngService.LLtoUSNG(latlng.lat, latlng.lng)
  }

  LeafletService.onMap(function(map) {
    $scope.mouseLocation = {};
    map.on('mousemove', function(args) {
      $scope.mouseLocation.usng = latlngToUSNG(args.latlng);
    });

    map.on('click', function(args) {
      $scope.beaconData.usng = latlngToUSNG(args.latlng);
    });
  });
};

MouseLocationController.$inject = ['$scope', 'LeafletService', 'UsngService'];

require('./_module').controller('MouseLocationController', MouseLocationController);
