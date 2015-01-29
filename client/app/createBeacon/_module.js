"use strict";

var factories = require('../../../shared/factories');

angular
  .module('modules.createBeacon', [
      'ui.router',
      'modules.providers'
    ]
  )
  .config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('dashboard.beacons.create', {
            name: 'dashboard.beacons.create',
            parent: 'dashboard.beacons',
            url: '/create',
            views: {
              'left': {
                templateUrl: 'templates/createBeacon/view.tpl.html',
                controller: 'CreateBeaconController'
              }
            }
          });
      }
    ]
  )
  .controller('CreateBeaconController',
    [         '$scope', '$state', 'NewBeaconFactory',
      function($scope,   $state,   NewBeaconFactory) {
        NewBeaconFactory.initScope($scope);

        $scope.completeNewBeacon = function(commit) {
          if (commit) {
            NewBeaconFactory.postNewBeacon();
          }

          $state.go('^.list');
        };
      }
    ]
  )
  .factory('NewBeaconFactory',
    [         'MessagePacketizer', 'RestService',
      function(MessagePacketizer,   RestService) {
        var scope;
        return {
          initScope: function ($scope) {
            scope = angular.extend($scope, {
              beaconPost: factories.newBeaconPostFactory()
                .withSummaryText('My Project', 'My Description')
                .withLocation(38.914268, -77.021098)
                .createBeaconPost()
            });

            scope.$on("leafletDirectiveMap.click", this.onMapClicked);
          },
          onMapClicked: function (clickEvent, clickArgs) {
            console.log('The map was clicked at:', clickArgs.leafletEvent.latlng);
            scope.latitude = clickArgs.leafletEvent.latlng.lat;
            scope.longitude = clickArgs.leafletEvent.latlng.lng;
          },
          postNewBeacon : function () {
            var message = MessagePacketizer.packetize(scope.beaconPost);
            RestService.createBeacon(message);
          }
        };
      }
    ]
  );
