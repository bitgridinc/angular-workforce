"use strict";

require('../bower_components/leaflet');
require('../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');
require('../bower_components/leaflet.draw/dist/leaflet.draw.js');
require('../bower_components/ngDialog/js/ngDialog.js')

angular.module('app.controllers', ['ngDialog'])
  .controller('mapController', function($scope, leafletData, ngDialog) {
    angular.extend($scope, {
      defaults: {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
      },
      washdc: {
        lat: 38.914268,
        lng: -77.021098,
        zoom: 13
      },
      controls: {
        draw: {}
      },
      events: {}
    });

    // Simply to figure out how to add controls, here's the draw control
    leafletData.getMap().then(function(map) {
      var drawnItems = $scope.controls.draw.edit.featureGroup;
      map.on('draw:created', function (e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
        console.log(JSON.stringify(layer.toGeoJSON()));
      });
    });

    // Place markers when the user clicks on the map
    $scope.markers = [];

    $scope.$on("leafletDirectiveMap.click", function(event, args){
      console.log('leafletDirectiveMap.click');
      var latlng = args.leafletEvent.latlng;

      // There may be a cleaner way to open this dialog
      ngDialog.openConfirm({
        template: '/partials/request.html',
        className: 'ngdialog-theme-default',
        controller: 'requestController',
        data: {
          org: 'BitGrid',
          lat: latlng.lat,
          lng: latlng.lng
        }
      }).then(function (value) {
        console.log('Modal promise resolved. Value: ', value);
        $scope.markers.push({
          lat: latlng.lat,
          lng: latlng.lng
        });
        console.log('Marker added to map.');
      }, function (reason) {
        console.log('Modal promise rejected. Reason: ', reason);
      });
    });

    // Args will contain the marker name and other relevant information
    $scope.$on('leafletDirectiveMarker.click', function(e, args) {
      console.log('leafletDirectiveMarker.click');
      console.log(args.leafletEvent.target.options);

      // There may be a cleaner way to open this dialog
      ngDialog.openConfirm({
        template: '/partials/respond.html',
        className: 'ngdialog-theme-default',
        controller: 'respondController'
      }).then(function (value) {
        console.log('Modal promise resolved. Value: ', value);
      }, function (reason) {
        console.log('Modal promise rejected. Reason: ', reason);
      });
    });
  })
  .controller('requestController', function($scope) {
    $scope.requestController = {
      submitForm: function(data) {
        console.log(data);
        console.log("submitForm called.");
      }
    };
  })
  .controller('respondController', function($scope) {
    $scope.assistForm = {};
    $scope.assistForm.people = 1;

    $scope.assistForm.offerAssistance = function(beacon) {
      alert("You've accepted!");
    };
    $scope.assistForm.declineAssistance = function(beacon) {
      alert("You've declined!");
    };
  });
