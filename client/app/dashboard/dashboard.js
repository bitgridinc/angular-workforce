"use strict";

require('../../bower_components/leaflet');
require('../../bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js');
require('../../bower_components/leaflet.draw/dist/leaflet.draw.js');
require('../../bower_components/ngDialog/js/ngDialog.js');
require('../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');
require('../../common/services/beaconService.js');

angular.module('dashboard', ['ngDialog', 'ui.bootstrap', 'app.services'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl'
    });
  }])

  .controller('CascadingCollapseCtrl', function($scope) {
    function CascadingCollapse() {
      var showMidColumn = true;
      var showRightColumn = true;

      this.__defineGetter__("showMidColumn", function() {
        return showMidColumn;
      });

      this.__defineGetter__("showRightColumn", function() {
        return showRightColumn;
      });

      this.__defineSetter__("showMidColumn", function(value) {
        showMidColumn = value;
        if (value === false) {
          showRightColumn = false;
        }
      });

      this.__defineSetter__("showRightColumn", function(value) {
        showRightColumn = value;
      });
    }

    angular.extend($scope, {
      cascadingCollapse: new CascadingCollapse()
    });
  })

  .controller('DashboardCtrl', function($scope, leafletData, ngDialog) {
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

    // TODO: Move this
    $scope.status = {
      selectedBeacon: undefined
    }

    // I'm using this to easily populate the latitude and longitude fields on Create Beacon
    $scope.$on("leafletDirectiveMap.click", function(clickEvent, clickArgs) {
      console.log('leafletDirectiveMap.click');
      $scope.lastlatlng = clickArgs.leafletEvent.latlng;
    });

    // clickArgs will contain the marker name and other relevant information
    $scope.$on('leafletDirectiveMarker.click', function(clickEvent, clickArgs) {
      console.log('Opening dialog to respond to clicked beacon.', clickArgs.leafletEvent.target);
      var lastSelectedMarker = clickArgs.leafletEvent.target;

      ngDialog.openConfirm({
        template: '/partials/respond.html',
        className: 'ngdialog-theme-default',
        controller: 'respondController',
        data: clickArgs.leafletEvent.target.options
      }).then(function(ngDialogData) {
        console.log('Modal response dialog promise resolved. Value: ', ngDialogData);
        for (var i = 0; i < $scope.markers.length; i++) {
          if ($scope.markers[i].$$hashKey === lastSelectedMarker.options.$$hashKey) {
            $scope.markers[i].responderName = ngDialogData.responderName;
            $scope.markers[i].numResponders = ngDialogData.numResponders;
          }
        }
      }, function(reason) {
        console.log('Modal response dialog promise rejected. Reason: ', reason);
      });
    });
  })

  .controller('requestController', function($scope) {
    angular.extend($scope, {
      newBeaconData: {
        title: 'Job Title',
        description: 'Project Description',
        organization: 'Organization'
      },
      submitNewBeacon: function() {
        console.log("submitNewBeacon called.");
        $scope.markers.push({
          title: $scope.newBeaconData.title,
          description: $scope.newBeaconData.description,
          organization: $scope.newBeaconData.organization,
          lat: $scope.lastlatlng.lat,
          lng: $scope.lastlatlng.lng
        });
        $scope.cascadingCollapse.showRightColumn = false;
        alert('You have successfully created a new beacon.');
      },
      deleteNewBeacon: function() {
        console.log("deleteNewBeacon called.");
        $scope.cascadingCollapse.showRightColumn = false;
      }
    });
  })

  .controller('respondController', function($scope) {
    $scope.assistForm = {};
    $scope.assistForm.numResponders = 2;

    $scope.assistForm.offerAssistance = function() {
      alert("You've accepted!");
      console.log("You've accepted! $scope:", $scope);
      angular.extend($scope.ngDialogData, {
        responderName: $scope.assistForm.responderName,
        numResponders: $scope.assistForm.numResponders
      });
    };
    $scope.assistForm.declineAssistance = function() {
      alert("You've declined!");
    };
  });