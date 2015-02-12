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
    [         '$rootScope', 'RestService', 'geocoder',
      function($rootScope,   RestService,   geocoder) {
        var scope;
        return {
          initScope: function ($scope) {
            scope = angular.extend($scope, {
              beaconData: {
                title: undefined,
                description: undefined,
                streetAddress: undefined,
                city: undefined
              }
            });
          },
          postNewBeacon : function (recipientIds) {
            if (!angular.isDefined(scope.beaconData.title)) {
              throw new Error('Title is required');
            } else if (!angular.isDefined(scope.beaconData.description)) {
              throw new Error('Description is required');
            } else if (!angular.isDefined(scope.beaconData.streetAddress)) {
              throw new Error('Street Address is required');
            } else if (!angular.isDefined(scope.beaconData.city)) {
              throw new Error('City is required');
            }

            geocoder.geocodeAddress(scope.beaconData.streetAddress, scope.beaconData.city).then(
              function(address) {
                var beaconPost = factories.newBeaconPostFactory()
                  .withSenderId($rootScope.socketState.currentEntity.id)
                  .withSummaryText(scope.beaconData.title, scope.beaconData.description)
                  .withLocation(address.lat, address.lng)
                  .withRecipientIds(recipientIds)
                  .createBeaconPost();
                RestService.createBeacon(beaconPost);
              });
          }
        };
      }
    ]
  );
