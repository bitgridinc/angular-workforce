"use strict";

var factories = require('../../../shared/factories'),
    _ = require('../../bower_components/lodash/dist/lodash.js');

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
    [         '$rootScope', '$scope', '$state', 'NewBeaconFactory',
      function($rootScope,   $scope,   $state,   NewBeaconFactory) {
        NewBeaconFactory.initScope($scope);

        // Note that a filter *might* be better as we grow as it would be reusable.
        $scope.possibleRecipients = [];
        _.forEach($rootScope.socketState.allEntities, function(entity) {
          if (entity.id !== $rootScope.socketState.currentEntity.id) {
            $scope.possibleRecipients.push({
              include: true,
              entity: entity
            });
          }
        });

        $scope.completeNewBeacon = function(commit) {
          if (commit) {
            var recipientIds = _.chain($scope.possibleRecipients)
              .where({ include: true })
              .map(function(r) {
                return r.entity.id
              })
              .value();
            if (recipientIds.length > 0) {
              NewBeaconFactory.postNewBeacon(recipientIds);
            } else {
              alert('Please select at least one recipient.');
              throw new Error('No recipients selected when creating a new beacon.');
            }
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
          postNewBeacon : function (recipientIds) {
            // TODO: Make this a fluent library
            var message = MessagePacketizer.packetize(scope.beaconPost, undefined, recipientIds);
            RestService.createBeacon(message);
          }
        };
      }
    ]
  );
