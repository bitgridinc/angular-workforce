"use strict";

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
          .state('dashboard.mycompany.create', {
            name: 'dashboard.mycompany.create',
            parent: 'dashboard.mycompany',
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
    [         'MessagePacketizer', 'MessageSender',
      function(MessagePacketizer,   MessageSender) {
        var scope;
        return {
          initScope: function ($scope) {
            scope = angular.extend($scope, {
              title: 'My Project',
              description: 'My Description',
              latitude: 38.914268,
              longitude: -77.021098
            });

            scope.$on("leafletDirectiveMap.click", this.onMapClicked);
          },
          onMapClicked: function (clickEvent, clickArgs) {
            console.log('The map was clicked at:', clickArgs.leafletEvent.latlng);
            scope.latitude = clickArgs.leafletEvent.latlng.lat;
            scope.longitude = clickArgs.leafletEvent.latlng.lng;
          },
          postNewBeacon : function () {
            var message = MessagePacketizer.packetize({
              title: scope.title,
              description: scope.description,
              lat: scope.latitude,
              lng: scope.longitude
            });
            MessageSender.send(message);
          }
        };
      }
    ]
  );
