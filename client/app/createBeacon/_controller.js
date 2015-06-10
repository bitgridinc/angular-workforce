"use strict";

require('./_module')
  .controller('CreateBeaconController',
    [         '$rootScope', '$scope', 'NewBeaconFactory', '_',
      function($rootScope,   $scope,   NewBeaconFactory,   _) {
        NewBeaconFactory.initScope($scope);

        // Note that a filter *might* be better as we grow as it would be reusable.
        $scope.possibleRecipients = [];
        _.forEach($rootScope.dataFromServer.allOrganizations, function(organization) {
          if (organization.id !== $rootScope.dataFromServer.currentOrganization.id) {
            $scope.possibleRecipients.push({
              include: true,
              organization: organization
            });
          }
        });

        $scope.completeNewBeacon = function(commit) {
          if (commit) {
            var recipientIds = _.chain($scope.possibleRecipients)
              .where({ include: true })
              .map(function(r) {
                return r.organization.id
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
          $rootScope.userNavigationService.navigateTo('^.list');
        }
      }
    ]
  );
