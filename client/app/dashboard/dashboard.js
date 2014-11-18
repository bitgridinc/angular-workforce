"use strict";

require('../../bower_components/leaflet');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');
require('../../bower_components/leaflet.draw/dist/leaflet.draw.js');
require('../../bower_components/ngDialog/js/ngDialog.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');
require('../../common/services/beaconService.js');

angular.module('dashboard', ['ngDialog', 'ui.bootstrap', 'app.services'])
  .controller('dashboardCtrl', function($scope, leafletData, ngDialog) {
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
      events: {},
      markers: []
    });

    $scope.status = {
      isCollapsed: false,
      showCreateForm: false
    };

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
        // beaconService.createBeacon(beaconData).then(function(newBeacon) {
        //   $scope.markers.push(newBeacon);
        // };
        console.log('Marker added to dashboard.');
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