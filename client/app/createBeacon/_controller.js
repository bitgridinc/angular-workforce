"use strict";

require('./_module')
  .controller('CreateBeaconController',
    [         '$rootScope', '$scope', 'NewBeaconFactory', '_', 'toaster',
      function($rootScope,   $scope,   NewBeaconFactory,   _,   toaster) {
        NewBeaconFactory.initScope($scope);

        // Note that a filter *might* be better as we grow as it would be reusable.
        // TODO: Test adding allOrganizations after the watch is set
        $scope.possibleRecipients = [];
        $rootScope.$watchCollection('dataFromServer.allOrganizations', function(newOrganizations) {
          $scope.possibleRecipients.length = 0;
          _.forEach(newOrganizations, function(organization) {
            if (organization.id !== $rootScope.dataFromServer.currentOrganization.id) {
              $scope.possibleRecipients.push({
                include: true,
                organization: organization
              });
            }
          });
        });

        $scope.completeNewBeacon = function() {
          var recipientIds = _.chain($scope.possibleRecipients)
            .where({ include: true })
            .map(function(r) {
              return r.organization.id
            })
            .value();
          if (recipientIds.length <= 0) {
            alert('Please select at least one recipient.');
            throw new Error('No recipients selected when creating a new beacon.');
          }

          NewBeaconFactory.postNewBeacon(recipientIds).then(function(result) {
            // TODO: Handle error and test
            // I'm just putting this here to remember how it's done. I expect to move this around.
            toaster.pop({ // pass a high timeout to keep the toaster longer
              type: 'success',
              title: 'Success!',
              body: 'Your aid beacon is in effect'
            });
            $rootScope.navigationService.navigateTo('^.list');
          });
        };
      }
    ]
  );
