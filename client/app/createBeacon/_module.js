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
    [         '$rootScope', '$scope', '$state', 'NewBeaconFactory', '_',
      function($rootScope,   $scope,   $state,   NewBeaconFactory,   _) {
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
    [         '$rootScope', 'RestService',
      function($rootScope,   RestService) {
        var scope;
        return {
          initScope: function ($scope) {
            scope = angular.extend($scope, {
              title: undefined,
              description: undefined,
              lat: 38.914268,
              lng: -77.021098
            });

            scope.$on("leafletDirectiveMap.click", this.onMapClicked);
          },
          onMapClicked: function (clickEvent, clickArgs) {
            console.log('The map was clicked at:', clickArgs.leafletEvent.latlng);
            scope.lat = clickArgs.leafletEvent.latlng.lat;
            scope.lng = clickArgs.leafletEvent.latlng.lng;
          },
          postNewBeacon : function (recipientIds) {
            var beaconPost = factories.newBeaconPostFactory()
              .withSenderId($rootScope.socketState.currentEntity.id)
              .withSummaryText(scope.title, scope.description)
              .withLocation(scope.lat, scope.lng)
              .withRecipientIds(recipientIds)
              .createBeaconPost();
            RestService.createBeacon(beaconPost);
          }
        };
      }
    ]
  );
