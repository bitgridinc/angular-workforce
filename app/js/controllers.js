"use strict";

require('../bower_components/leaflet');
require('../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');
require('../bower_components/leaflet.draw/dist/leaflet.draw.js');
require('../bower_components/ngDialog/js/ngDialog.js');
require('./ui-bootstrap-tpls-0.11.2.js');

angular.module('app.controllers', ['ngDialog', 'ui.bootstrap'])
  .controller('mapController', function($scope, leafletData, ngDialog) {
    angular.extend($scope, {
      defaults: {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        zoomControl: false
      },
      washdc: {
        lat: 38.914268,
        lng: -77.021098,
        zoom: 13
      },
      controls: {
        custom: []
      },
      events: {},
      markers: []
    });

    $scope.status = {
      isopen: false
    };

    var MyControl = L.control();
    MyControl.setPosition('topleft');
    MyControl.onAdd = function() {
      var className = 'leaflet-control-my-location';
      var container = L.DomUtil.create('div');
      container.innerHTML = "<div ng-init=\"scope = { isDisabled: false }\"><button disabled=\"{{scope.isDisabled}}\">Disabled</button></div>";
      return container;
    }

    $scope.controls.custom.push(MyControl);

    // Simply to figure out how to add controls, here's the draw control
    /*leafletData.getMap().then(function(map) {
      var drawnItems = $scope.controls.draw.edit.featureGroup;
      map.on('draw:created', function(e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
        console.log(JSON.stringify(layer.toGeoJSON()));
      });
    });*/

    $scope.$on("leafletDirectiveMap.click", function(clickEvent, clickArgs) {
      console.log('leafletDirectiveMap.click');
      console.log(clickEvent);
      console.log(clickArgs);

      var latlng = clickArgs.leafletEvent.latlng;

      // TODO: Investigate the open() method of ngDialog for this purpose
      ngDialog.openConfirm({
        template: '/partials/request.html',
        className: 'ngdialog-theme-default',
        controller: 'requestController',
        data: {
          org: 'BitGrid',
          lat: latlng.lat,
          lng: latlng.lng
        }
      }).then(function(value) {
        console.log('Modal request dialog promise resolved. Value: ', value);
        $scope.markers.push(value);
        console.log('Marker added to map.');
      }, function(reason) {
        console.log('Modal request dialog promise rejected. Reason: ', reason);
      });
    });

    // clickArgs will contain the marker name and other relevant information
    $scope.$on('leafletDirectiveMarker.click', function(clickEvent, clickArgs) {
      console.log('Opening dialog to respond to clicked beacon.');
      ngDialog.openConfirm({
        template: '/partials/respond.html',
        className: 'ngdialog-theme-default',
        controller: 'respondController',
        data: clickArgs.leafletEvent.target.options
      }).then(function(value) {
        console.log('Modal response dialog promise resolved. Value: ', value);
      }, function(reason) {
        console.log('Modal response dialog promise rejected. Reason: ', reason);
      });
    });
  })
  .controller('requestController', function($scope) {
    $scope.requestController = {
      submitForm: function(data) {
        console.log("submitForm called.");
        console.log(data);
      }
    };
  })
  .controller('respondController', function($scope) {
    $scope.assistForm = {};
    $scope.assistForm.numResponders = 1;

    $scope.assistForm.offerAssistance = function(beacon) {
      alert("You've accepted!");
    };
    $scope.assistForm.declineAssistance = function(beacon) {
      alert("You've declined!");
    };
  });