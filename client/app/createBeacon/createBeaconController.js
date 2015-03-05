"use strict";

require('./_module')
  .controller('CreateBeaconController',
    [         '$rootScope', '$scope', 'state', 'NewBeaconFactory', '_',
      function($rootScope,   $scope,   state,   NewBeaconFactory,   _) {
        NewBeaconFactory.initScope($scope);

        // Note that a filter *might* be better as we grow as it would be reusable.
        $scope.possibleRecipients = [];
        _.forEach($rootScope.dataFromServer.allEntities, function(entity) {
          if (entity.id !== $rootScope.dataFromServer.currentEntity.id) {
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

          $scope.goBackToList();
        };

        $scope.goBackToList = function() {
          state.go('^.list');
        }
      }
    ]
  );
